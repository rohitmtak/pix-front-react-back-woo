# Pix Backend - WooCommerce Integration

This backend service integrates with WooCommerce to provide product data for the Pix frontend application.

## Features

- Product listing with pagination
- Product details by ID
- Category-based product filtering
- Search functionality
- RESTful API endpoints

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `env.example` to `.env`
   - Update the WooCommerce API credentials:
     - `WOOCOMMERCE_URL`: Your WooCommerce store URL
     - `WOOCOMMERCE_CONSUMER_KEY`: Your WooCommerce consumer key
     - `WOOCOMMERCE_CONSUMER_SECRET`: Your WooCommerce consumer secret

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Products
- `GET /api/products` - Get all products (with pagination, category, and search filters)
- `GET /api/products/:id` - Get product by ID

### Categories
- `GET /api/categories` - Get all product categories
- `GET /api/categories/:id/products` - Get products by category ID

## Query Parameters

### Products Endpoint
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 20)
- `category` (optional): Filter by category ID
- `search` (optional): Search term

### Category Products Endpoint
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 20)

## Development

- `npm run dev` - Start with nodemon for development
- `npm start` - Start production server

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `WOOCOMMERCE_URL`: WooCommerce store URL
- `WOOCOMMERCE_CONSUMER_KEY`: WooCommerce API consumer key
- `WOOCOMMERCE_CONSUMER_SECRET`: WooCommerce API consumer secret
