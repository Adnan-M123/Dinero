const express = require('express');
const router = express.Router();
const db = require('../db'); // uses the connection from db.js

// GET /api/users - get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // return the users as JSON
  });
});

module.exports = router;
