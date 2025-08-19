# 🚀 Pix Backend Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher)
2. **WooCommerce Store** with API access
3. **WooCommerce API Keys** (Consumer Key & Consumer Secret)

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Configure WooCommerce API

### Get Your WooCommerce API Keys:

1. Go to your WordPress admin panel
2. Navigate to **WooCommerce → Settings → Advanced → REST API**
3. Click **Add Key**
4. Set permissions to **Read/Write**
5. Copy the **Consumer Key** and **Consumer Secret**

### Create Environment File:

1. Copy `env.example` to `.env`
2. Update the following variables:

```env
WOOCOMMERCE_URL=https://your-store.com
WOOCOMMERCE_CONSUMER_KEY=your-consumer-key-here
WOOCOMMERCE_CONSUMER_SECRET=your-consumer-secret-here
PORT=5000
NODE_ENV=development
```

## Step 3: Start the Backend

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

### Using Scripts:
- **Windows**: Double-click `start-dev.bat`
- **Unix/Linux**: Run `./start-dev.sh`

## Step 4: Test the API

Once the server is running, test the endpoints:

```bash
npm test
```

Or manually test:
- Health check: `http://localhost:5000/api/health`
- Products: `http://localhost:5000/api/products`
- Categories: `http://localhost:5000/api/categories`

## Step 5: Frontend Integration

The backend provides these endpoints that your frontend can use:

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - List all categories
- `GET /api/categories/:id/products` - Get products by category

## API Response Format

All endpoints return data in this format:

```json
{
  "success": true,
  "data": [...],
  "total": 100,
  "totalPages": 5
}
```

## Troubleshooting

### Common Issues:

1. **Connection refused**: Make sure the server is running on port 5000
2. **WooCommerce API errors**: Verify your API keys and store URL
3. **CORS issues**: Check if your frontend URL is correct in the config

### Debug Mode:

Set `NODE_ENV=development` in your `.env` file for detailed error logs.

## Next Steps

1. ✅ Backend is running and connected to WooCommerce
2. 🔄 Update frontend to use these API endpoints
3. 🧪 Test all functionality
4. 🚀 Deploy to production

## Support

If you encounter issues:
1. Check the console logs
2. Verify WooCommerce API credentials
3. Ensure your store has products and categories
4. Check network connectivity to your WooCommerce store
