# API Integration Setup

This document explains how to set up the frontend to work with the backend API.

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=PIX
VITE_APP_VERSION=1.0.0
```

## Backend Requirements

Make sure your backend server is running on port 5000 and has the following endpoints:

- `GET /api/health` - Health check
- `GET /api/products` - Get all products (with pagination, category, search filters)
- `GET /api/products/:id` - Get single product by ID
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id/products` - Get products by category

## Features Implemented

### Collection Page
- ✅ Fetches products from API
- ✅ Pagination support
- ✅ Category filtering
- ✅ Search functionality
- ✅ Loading states
- ✅ Error handling
- ✅ Grid layout toggle

### Product Detail Page
- ✅ Fetches product details from API
- ✅ Dynamic size and color selection based on product attributes
- ✅ Image gallery with thumbnails
- ✅ Product information tabs
- ✅ Loading states
- ✅ Error handling

### API Layer
- ✅ TypeScript interfaces for all data structures
- ✅ React Query integration for caching and state management
- ✅ Error handling and retry logic
- ✅ Environment-based configuration

## Usage

1. Start your backend server (should be running on port 5000)
2. Create the `.env` file with the correct API URL
3. Start the frontend development server: `npm run dev`
4. Navigate to the collection page to see products loaded from the API

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend has CORS enabled for `http://localhost:3000`
2. **API Connection Failed**: Verify your backend is running and accessible at the configured URL
3. **Products Not Loading**: Check the browser console for error messages and verify API endpoints

### Debug Mode

The app includes comprehensive error handling and loading states. Check the browser console for detailed error information if something goes wrong.

## Next Steps

- [ ] Implement wishlist functionality
- [ ] Add shopping cart integration
- [ ] Implement user authentication
- [ ] Add product reviews and ratings
- [ ] Implement checkout process
