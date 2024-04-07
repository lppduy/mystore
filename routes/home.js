const express = require('express');
const { renderProducts } = require('../controllers/productController');
const router = express.Router();
const cookieParser = require('cookie-parser')

router.use(cookieParser());
router.get('/', renderProducts);

module.exports = router;