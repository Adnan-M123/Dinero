const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Test root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Mount your users API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
