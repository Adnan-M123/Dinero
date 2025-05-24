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

// GET /api/restaurants/name/:name - fetch a single restaurant by name
router.get('/name/:name', (req, res) => {
  const restaurantName = req.params.name;
  const sql = 'SELECT * FROM Restaurants WHERE LOWER(name) = LOWER(?)';
  db.query(sql, [restaurantName], (err, results) => {
    if (err) {
      console.error('Error fetching restaurant:', err);
      return res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(results[0]);
  });
});



// GET /api/restaurants/name/:name/workhours - fetch work hours for a restaurant by name
router.get('/name/:name/workhours', (req, res) => {
  const restaurantName = req.params.name;
  const sql = `
    SELECT wh.day_of_week, wh.open_time, wh.close_time
    FROM WorkHours wh
    JOIN Restaurants r ON wh.restaurant_id = r.id
    WHERE LOWER(r.name) = LOWER(?)
    ORDER BY wh.day_of_week
  `;
  db.query(sql, [restaurantName], (err, results) => {
    if (err) {
      console.error('Error fetching work hours:', err);
      return res.status(500).json({ error: 'Failed to fetch work hours' });
    }
    res.json(results);
  });
});

// GET /api/restaurants/name/:name/menu - fetch menu items for a restaurant by name
router.get('/name/:name/menu', (req, res) => {
  const restaurantName = req.params.name;
  const sql = `
    SELECT mi.id, mi.name, mi.description, mi.price, mi.image_url
    FROM MenuItems mi
    JOIN Restaurants r ON mi.restaurant_id = r.id
    WHERE LOWER(r.name) = LOWER(?)
    ORDER BY mi.name
  `;
  db.query(sql, [restaurantName], (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      return res.status(500).json({ error: 'Failed to fetch menu items' });
    }
    res.json(results);
  });
});


module.exports = router;