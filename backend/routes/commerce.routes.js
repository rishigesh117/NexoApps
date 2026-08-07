const express = require('express');
const router = express.Router();
const commerceController = require('../controllers/commerce.controller');

router.get('/cart', (req, res) => commerceController.getCart(req, res));
router.post('/cart', (req, res) => commerceController.addToCart(req, res));
router.get('/wishlist', (req, res) => commerceController.getWishlist(req, res));
router.get('/orders', (req, res) => commerceController.getOrders(req, res));
router.get('/analytics', (req, res) => commerceController.getAnalytics(req, res));

module.exports = router;
