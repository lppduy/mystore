const express = require('express');
const { renderProducts } = require('../controllers/productController');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/auth');

router.use(cookieParser());
router.get('/', auth, renderProducts);

module.exports = router;