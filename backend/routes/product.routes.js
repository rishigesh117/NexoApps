const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', (req, res) => productController.getProducts(req, res));
router.get('/categories', (req, res) => productController.getCategories(req, res));
router.get('/:slug', (req, res) => productController.getProductBySlug(req, res));

module.exports = router;
