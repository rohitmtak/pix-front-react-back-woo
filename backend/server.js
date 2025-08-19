const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Import routes
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// API routes
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
