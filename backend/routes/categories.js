const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT id, name FROM Categories', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch categories' });
    res.json(results);
  });
});

module.exports = router;