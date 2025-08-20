# CORS Issue Solution

## 🔍 **Problem Identified:**

You're experiencing a CORS (Cross-Origin Resource Sharing) policy error because:

1. **Backend server** is configured to only allow requests from `http://localhost:3000`
2. **Frontend** is running on `http://localhost:5173` (Vite's default port)
3. **CORS mismatch** between the configured allowed origin and the actual frontend origin

## 🛠️ **Solutions Implemented:**

### 1. **Vite Proxy Configuration (Recommended for Development)**

I've added a proxy configuration to `frontend/vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
  },
},
```

This will proxy all `/api/*` requests from the frontend to the backend, avoiding CORS issues entirely.

### 2. **Updated API Service**

The API service now uses relative URLs in development:
- **Development**: `/api` (proxied through Vite)
- **Production**: `http://localhost:5000/api` (direct API calls)

### 3. **Backend CORS Configuration**

Updated `backend/server.js` with explicit CORS configuration:

```javascript
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## 🚀 **How to Apply the Fix:**

### **Option 1: Use Vite Proxy (Easiest)**

1. **Restart the frontend** development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. **The proxy will automatically handle CORS** - no backend changes needed

### **Option 2: Fix Backend CORS (More Robust)**

1. **Stop the current backend server** (it's still running with old CORS config)
2. **Restart the backend server**:
   ```bash
   cd backend
   npm run dev
   ```

3. **Verify the new CORS configuration** is loaded

## 🔧 **Why This Happened:**

1. **Port Mismatch**: Your backend was configured for port 3000, but Vite runs on 5173
2. **Server Not Restarted**: CORS configuration changes require a server restart
3. **Development vs Production**: Different ports in development vs production environments

## ✅ **Current Status:**

- ✅ **Frontend proxy configured** - will work immediately after restart
- ✅ **Backend CORS updated** - needs server restart to take effect
- ✅ **API service updated** - handles both proxy and direct API calls
- ✅ **Error handling improved** - better error messages for debugging

## 🎯 **Next Steps:**

1. **Restart your frontend** development server
2. **Test the collection page** - should now load products without CORS errors
3. **If issues persist**, restart the backend server as well

## 🐛 **Troubleshooting:**

- **Still getting CORS errors?** Restart both frontend and backend servers
- **Proxy not working?** Check that Vite is running and the config is loaded
- **Backend not responding?** Verify the backend is running on port 5000

The Vite proxy solution should resolve your CORS issues immediately!
