const express = require('express');
const router = express.Router();
const db = require('../db'); // make sure this path matches your db connection file

// GET /api/restaurants - fetch all restaurants
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Restaurants';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching restaurants:', err);
      return res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
    res.json(results);
  });
});

module.exports = router;
