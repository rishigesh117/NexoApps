const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');

router.get('/account', (req, res) => sellerController.getAccount(req, res));
router.get('/payouts', (req, res) => sellerController.getPayouts(req, res));

module.exports = router;
