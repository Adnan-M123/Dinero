

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
app.use('/api/users', require('./routes/users'));
app.use('/api/restaurants', require('./routes/restaurants'));

// Start the server
app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});