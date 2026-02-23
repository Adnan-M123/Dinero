const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // DONT FORGET TO MAKE AN ENV

// Multer setup for profile pictures
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});

// Register
router.post("/register", async (req, res) => {
  const { username, email, password, profile_picture } = req.body;

  // Validation
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  // Strong password validation
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters, contain a number, and a capital letter.",
    });
  }

  // Email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // hashing the password 10 times
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO Users (username, email, password, profile_picture, role) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashed, profile_picture || null, "user"],
      (err, result) => {
        if (err) {
          console.error("Registration error:", err);
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "Username or email already exists" });
          }
          return res.status(500).json({ error: "Registration failed" });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error("Hashing error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  db.query(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      try {
        // Compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token if password is correct
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
            email: user.email,
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        // Send response with token and user info
        res.json({
          token,
          role: user.role,
          restaurant_id: user.restaurant_id,
          profile_picture: user.profile_picture,
          username: user.username,
        });
      } catch (error) {
        console.error("Password comparison error:", error);
        res.status(500).json({ error: "Login failed" });
      }
    }
  );
});

// OVDJE NASTAVI

// Get profile (protected)
router.get("/profile", authenticateToken, (req, res) => {
  db.query(
    "SELECT id, username, email, created_at, profile_picture FROM Users WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err || results.length === 0)
        return res.status(404).json({ error: "User not found" });
      res.json(results[0]);
    }
  );
});

// Profile picture upload (protected)
router.post(
  "/profile-picture",
  authenticateToken,
  upload.single("profilePicture"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const url = `/uploads/${req.file.filename}`;
    db.query(
      "UPDATE Users SET profile_picture = ? WHERE id = ?",
      [url, req.user.id],
      (err) => {
        if (err) return res.status(500).json({ error: "Failed to save image" });
        res.json({ url });
      }
    );
  }
);

// Update profile
router.put("/profile", authenticateToken, (req, res) => {
  const { username, email } = req.body;

  db.query(
    "UPDATE Users SET username = ?, email = ? WHERE id = ?",
    [username, email, decoded.id],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ error: "Username or email already exists" });
        }
        return res.status(500).json({ error: "Failed to update profile" });
      }
      res.json({ message: "Profile updated" });
    }
  );
});

module.exports = router;
