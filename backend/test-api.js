const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing Pix Backend API...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test products endpoint
    console.log('2. Testing products endpoint...');
    const productsResponse = await axios.get(`${BASE_URL}/products?per_page=5`);
    console.log('✅ Products endpoint working');
    console.log(`   Found ${productsResponse.data.data.length} products`);
    console.log(`   Total products: ${productsResponse.data.total}`);
    console.log('');

    // Test categories endpoint
    console.log('3. Testing categories endpoint...');
    const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
    console.log('✅ Categories endpoint working');
    console.log(`   Found ${categoriesResponse.data.data.length} categories`);
    console.log('');

    console.log('🎉 All API endpoints are working correctly!');
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Make sure the backend server is running on port 5000');
      console.log('   Run: npm run dev');
    } else {
      console.error('❌ API test failed:', error.message);
    }
  }
}

testAPI();
