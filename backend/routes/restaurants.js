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

// GET /api/restaurants/name/:name/menu - fetch menu items with categories
router.get('/name/:name/menu', (req, res) => {
  const restaurantName = req.params.name;
  const sql = `
    SELECT mi.id, mi.name, mi.description, mi.price, mi.image_url,
      GROUP_CONCAT(c.name) AS categories
    FROM MenuItems mi
    JOIN Restaurants r ON mi.restaurant_id = r.id
    LEFT JOIN MenuItemCategories mic ON mi.id = mic.menu_item_id
    LEFT JOIN Categories c ON mic.category_id = c.id
    WHERE LOWER(r.name) = LOWER(?)
    GROUP BY mi.id
    ORDER BY mi.name
  `;
  db.query(sql, [restaurantName], (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      return res.status(500).json({ error: 'Failed to fetch menu items' });
    }
    // Split categories string into array
    results.forEach(item => {
      item.categories = item.categories ? item.categories.split(',') : [];
    });
    res.json(results);
  });
});

// GET /api/restaurants/name/:name/categories - fetch categories for a restaurant by name
router.get('/name/:name/categories', (req, res) => {
  const restaurantName = req.params.name;
  const sql = `
    SELECT DISTINCT c.id, c.name
    FROM Categories c
    JOIN MenuItemCategories mic ON c.id = mic.category_id
    JOIN MenuItems mi ON mic.menu_item_id = mi.id
    JOIN Restaurants r ON mi.restaurant_id = r.id
    WHERE LOWER(r.name) = LOWER(?)
    ORDER BY c.name
  `;
  db.query(sql, [restaurantName], (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    console.log('Queried restaurant:', restaurantName, 'Categories:', results);
    res.json(results);
  });
});

module.exports = router;