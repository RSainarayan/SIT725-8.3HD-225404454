const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Pages (static HTML served)
router.get('/', productController.pageIndex);
router.get('/new', productController.pageNew);
router.get('/:id', productController.pageShow);

// API endpoints for client-side JS
router.get('/data', productController.apiIndex);
router.get('/data/:id', productController.apiShow);
// API endpoint for total quantity
router.get('/data/total-quantity', productController.apiTotalQuantity);

// Create / delete use traditional form posts
router.post('/', productController.create);
router.post('/:id/delete', productController.delete);

module.exports = router;
