const express = require('express');
const router = express.Router();
const { getCategories, getProducts } = require('../utils/woocommerce');

// Get all product categories
router.get('/', async (req, res) => {
  try {
    const result = await getCategories({
      per_page: 100,
      hide_empty: true
    });
    res.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// Get products by category ID
router.get('/:id/products', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, per_page = 20 } = req.query;
    
    const result = await getProducts({
      category: id,
      page,
      per_page,
      status: 'publish'
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category products',
      error: error.message
    });
  }
});

module.exports = router;
