const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplace.controller');

router.get('/items', marketplaceController.listItems);
router.post('/items', marketplaceController.createItem);
router.get('/items/:id', marketplaceController.getItemById);
router.get('/categories', marketplaceController.listCategories);
router.get('/recommendations', marketplaceController.getRecommendations);
router.get('/items/:id/reviews', marketplaceController.getReviews);
router.post('/items/:id/reviews', marketplaceController.addReview);

module.exports = router;
