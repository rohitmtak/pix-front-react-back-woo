const express = require('express');
const router = express.Router();
const { getProducts, getProduct } = require('../utils/woocommerce');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { page = 1, per_page = 20, category, search } = req.query;
    
    let params = {
      page,
      per_page,
      status: 'publish'
    };

    if (category) {
      params.category = category;
    }

    if (search) {
      params.search = search;
    }

    const result = await getProducts(params);
    res.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getProduct(id);
    res.json(result);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

module.exports = router;
