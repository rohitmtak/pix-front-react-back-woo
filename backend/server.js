const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();
const PORT = config.server.port;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'https://highpix.netlify.app', // Add your Netlify domain
    process.env.NODE_ENV === 'production' ? 'https://highpix.netlify.app' : 'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
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
  console.log('CORS enabled for:', corsOptions.origin);
});
