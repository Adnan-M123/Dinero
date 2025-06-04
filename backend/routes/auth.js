const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const JWT_SECRET = 'your_secret_key'; // Use env variable in production

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage: storage });

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, profile_picture } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields required' });

  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO Users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)',
    [username, email, hashed, profile_picture || null],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Registration failed' });
      }
      res.json({ message: 'User registered' });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = results[0];
    // Check password (add your password check logic here)
    // If password is correct:
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      role: user.role,
      restaurant_id: user.restaurant_id
    });
  });
});

// Get profile (protected)
router.get('/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    db.query(
      'SELECT id, username, email, created_at, profile_picture FROM Users WHERE id = ?',
      [decoded.id],
      (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(results[0]);
      }
    );
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Profile picture upload
router.post('/profile-picture', upload.single('profilePicture'), (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    db.query(
      'UPDATE Users SET profile_picture = ? WHERE id = ?',
      [url, decoded.id],
      (err) => {
        if (err) return res.status(500).json({ error: 'Failed to save image' });
        res.json({ url });
      }
    );
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update profile
router.put('/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { username, email } = req.body;
  db.query(
    'UPDATE Users SET username = ?, email = ? WHERE id = ?',
    [username, email, decoded.id],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Failed to update profile' });
      }
      res.json({ message: 'Profile updated' });
    }
  );
});

module.exports = router;
