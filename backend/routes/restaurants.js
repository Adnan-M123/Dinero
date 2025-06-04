const express = require('express');
const router = express.Router();
const db = require('../db'); // make sure this path matches your db connection file
const { authenticateToken } = require('../middleware/auth'); // adjust the path as necessary

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
// router.get('/name/:name', (req, res) => {
//   const restaurantName = req.params.name;
//   const sql = 'SELECT * FROM Restaurants WHERE LOWER(name) = LOWER(?)';
//   db.query(sql, [restaurantName], (err, results) => {
//     if (err) {
//       console.error('Error fetching restaurant:', err);
//       return res.status(500).json({ error: 'Failed to fetch restaurant' });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Restaurant not found' });
//     }
//     res.json(results[0]);
//   });
// });

router.get('/name/:name', (req, res) => {
  const decodedName = decodeURIComponent(req.params.name);
  db.query('SELECT * FROM Restaurants WHERE name = ?', [decodedName], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!results || results.length === 0) return res.status(404).json({ error: 'Not found' });
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
    // console.log('Queried restaurant:', restaurantName, 'Categories:', results);
    res.json(results);
  });
});

// GET /api/categories - fetch all categories
router.get('/categories', (req, res) => {
  const sql = 'SELECT id, name FROM Categories ORDER BY name';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(results);
  });
});

// GET /api/restaurants/by-category/:categoryId
router.get('/by-category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const sql = `
    SELECT DISTINCT r.*
    FROM Restaurants r
    JOIN MenuItems mi ON mi.restaurant_id = r.id
    JOIN MenuItemCategories mic ON mic.menu_item_id = mi.id
    WHERE mic.category_id = ?
    ORDER BY r.name
  `;
  db.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error('Error fetching restaurants by category:', err);
      return res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
    res.json(results);
  });
});

// GET /api/restaurants/featured-categories
router.get('/featured-categories', (req, res) => {
  const sql = 'SELECT id, name FROM Categories WHERE featured = 1 ORDER BY name';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching featured categories:', err);
      return res.status(500).json({ error: 'Failed to fetch featured categories' });
    }
    res.json(results);
  });
});

// GET /api/restaurants/search?q=...
router.get('/search', (req, res) => {
  const q = `%${req.query.q || ''}%`;
  const sql = `
    SELECT DISTINCT r.*
    FROM Restaurants r
    LEFT JOIN MenuItems mi ON mi.restaurant_id = r.id
    LEFT JOIN MenuItemCategories mic ON mic.menu_item_id = mi.id
    LEFT JOIN Categories c ON c.id = mic.category_id
    WHERE r.name LIKE ? OR mi.name LIKE ? OR c.name LIKE ?
    ORDER BY r.name
  `;
  db.query(sql, [q, q, q], (err, results) => {
    if (err) {
      console.error('Error searching restaurants:', err);
      return res.status(500).json({ error: 'Failed to search restaurants' });
    }
    res.json(results);
  });
});

// GET /api/menu-items - fetch all menu items (meals)
router.get('/menu-items', (req, res) => {
  const sql = 'SELECT id, name FROM MenuItems ORDER BY name';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      return res.status(500).json({ error: 'Failed to fetch menu items' });
    }
    res.json(results);
  });
});

// // GET /api/restaurants/:id/menu-items - fetch menu items for a specific restaurant
// router.get('/:id/menu-items', (req, res) => {
//   const restaurantId = req.params.id;
//   const sql = `
//     SELECT mi.*, c.name as category_name
//     FROM MenuItems mi
//     LEFT JOIN MenuItemCategories mic ON mic.menu_item_id = mi.id
//     LEFT JOIN Categories c ON c.id = mic.category_id
//     WHERE mi.restaurant_id = ?
//     ORDER BY c.name, mi.name
//   `;
//   db.query(sql, [restaurantId], (err, results) => {
//     if (err) {
//       console.error('Error fetching menu items:', err);
//       return res.status(500).json({ error: 'Failed to fetch menu items' });
//     }
//     res.json(results);
//   });
// });

// backend/routes/restaurants.js, for specific restaurant menu items page
router.get('/:id/menu-items', (req, res) => {
  const restaurantId = req.params.id;
  const sql = `
    SELECT mi.*, c.name as category_name
    FROM MenuItems mi
    LEFT JOIN MenuItemCategories mic ON mic.menu_item_id = mi.id
    LEFT JOIN Categories c ON c.id = mic.category_id
    WHERE mi.restaurant_id = ?
    ORDER BY c.name, mi.name
  `;
  db.query(sql, [restaurantId], (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      return res.status(500).json({ error: 'Failed to fetch menu items' });
    }
    res.json(results);
  });
});

// Add a menu item for a restaurant
router.post('/:id/menu-items', (req, res) => {
  const restaurantId = req.params.id;
  const { name, description, price, category_id, image_url } = req.body;

  // 1. Insert into MenuItems
  const sql = `
    INSERT INTO MenuItems (restaurant_id, name, description, price, image_url)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [restaurantId, name, description, price, image_url], (err, result) => {
    if (err) {
      console.error('Error adding menu item:', err);
      return res.status(500).json({ error: 'Failed to add menu item' });
    }
    const menuItemId = result.insertId;

    // Link to category in MenuItemCategories
    db.query(
      'INSERT INTO MenuItemCategories (menu_item_id, category_id) VALUES (?, ?)',
      [menuItemId, category_id],
      err2 => {
        if (err2) {
          console.error('Error linking menu item to category:', err2);
          return res.status(500).json({ error: 'Failed to link menu item to category' });
        }
        res.json({ message: 'Menu item added', id: menuItemId });
      }
    );
  });
});

// GET /api/restaurants/my - fetch the restaurant for the authenticated admin
router.get('/my', authenticateToken, (req, res) => {
  // req.user.id comes from the JWT
  const userId = req.user.id;
  const sql = `
    SELECT r.*
    FROM Restaurants r
    JOIN Users u ON r.id = u.restaurant_id
    WHERE u.id = ?
    LIMIT 1
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!results.length) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(results[0]);
  });
});

// Get reservations for the logged-in admin's restaurant
router.get('/my/reservations', require('../middleware/auth').authenticateToken, (req, res) => {
  const userId = req.user.id;
  // Get the restaurant_id for this admin
  db.query('SELECT restaurant_id FROM Users WHERE id = ?', [userId], (err, userResults) => {
    if (err || !userResults.length) return res.status(500).json({ error: 'User not found' });
    const restaurantId = userResults[0].restaurant_id;
    db.query(
      `SELECT r.*, u.username, u.email
       FROM Reservations r
       JOIN Users u ON r.user_id = u.id
       WHERE r.restaurant_id = ?
       ORDER BY r.reservation_date DESC, r.reservation_time DESC`,
      [restaurantId],
      (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch reservations' });
        res.json(results);
      }
    );
  });
});

// Update the restaurant for the authenticated admin
router.put('/my', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const {
    name,
    description,
    address,
    phone,
    logo_url,
    website,
    map_link,
    google_maps_link,
    // email, // REMOVE THIS
  } = req.body;

  db.query(
    'SELECT restaurant_id FROM Users WHERE id = ?',
    [userId],
    (err, userResults) => {
      if (err || !userResults.length) {
        return res.status(500).json({ error: 'User not found' });
      }
      const restaurantId = userResults[0].restaurant_id;

      db.query(
        `UPDATE Restaurants SET name=?, description=?, address=?, phone=?, logo_url=?, website=?, map_link=?, google_maps_link=? WHERE id=?`,
        [
          name,
          description,
          address,
          phone,
          logo_url,
          website,
          map_link,
          google_maps_link,
          restaurantId,
        ],
        (err2) => {
          if (err2) {
            console.error('Error updating restaurant:', err2);
            return res.status(500).json({ error: 'Failed to update restaurant' });
          }
          res.json({ message: 'Restaurant updated' });
        }
      );
    }
  );
});

// Update a restaurant by ID (admin only)
router.put('/:id', require('../middleware/auth').authenticateToken, (req, res) => {
  const userId = req.user.id;
  const restaurantId = req.params.id;
  const {
    name,
    description,
    address,
    phone,
    email,
    logo_url,
    website,
    map_link,
    google_maps_link,
  } = req.body;

  // Check if this user is admin of this restaurant
  db.query(
    'SELECT restaurant_id FROM Users WHERE id = ? AND restaurant_id = ?',
    [userId, restaurantId],
    (err, userResults) => {
      if (err || !userResults.length) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      db.query(
        `UPDATE Restaurants SET name=?, description=?, address=?, phone=?, email=?, logo_url=?, website=?, map_link=?, google_maps_link=? WHERE id=?`,
        [
          name,
          description,
          address,
          phone,
          email,
          logo_url,
          website,
          map_link,
          google_maps_link,
          restaurantId,
        ],
        err2 => {
          if (err2) {
            return res.status(500).json({ error: 'Failed to update restaurant' });
          }
          res.json({ message: 'Restaurant updated' });
        }
      );
    }
  );
});

module.exports = router;
