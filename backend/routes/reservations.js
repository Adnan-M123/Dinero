const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Use env variable in production

// Create a reservation
router.post('/', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const { restaurant_id, reservation_date, reservation_time, number_of_guests } = req.body;
  db.query(
    'INSERT INTO Reservations (user_id, restaurant_id, reservation_date, reservation_time, number_of_guests) VALUES (?, ?, ?, ?, ?)',
    [decoded.id, restaurant_id, reservation_date, reservation_time, number_of_guests],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to make reservation' });
      res.json({ message: 'Reservation successful' });
    }
  );
});

// Get reservations for the logged-in user
router.get('/my', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
  db.query(
    `SELECT r.id, r.reservation_date, r.reservation_time, r.number_of_guests, r.status, r.created_at,
            rest.name AS restaurant_name
     FROM Reservations r
     JOIN Restaurants rest ON r.restaurant_id = rest.id
     WHERE r.user_id = ?
     ORDER BY r.reservation_date DESC, r.reservation_time DESC`,
    [decoded.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch reservations' });
      res.json(results);
    }
  );
});

// Cancel a reservation
router.put('/cancel/:id', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const reservationId = req.params.id;
  db.query(
    'UPDATE Reservations SET status = "Canceled" WHERE id = ? AND user_id = ?',
    [reservationId, decoded.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to cancel reservation' });
      res.json({ message: 'Reservation canceled' });
    }
  );
});

// Update reservation status
router.put('/:id/status', (req, res) => {
  const reservationId = req.params.id;
  const { status } = req.body;
  db.query(
    'UPDATE Reservations SET status = ? WHERE id = ?',
    [status, reservationId],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update status' });
      res.json({ message: 'Status updated' });
    }
  );
});

module.exports = router;
