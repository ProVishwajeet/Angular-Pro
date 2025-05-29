const express = require('express');
const cors = require('cors');
const cryptocurrencyRoutes = require('./routes/cryptocurrency.routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cryptocurrencies', cryptocurrencyRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Coinspace API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
