const express = require('express');
const { renderProducts } = require('../controllers/productController');
const router = express.Router();

router.get('/', renderProducts);

module.exports = router;