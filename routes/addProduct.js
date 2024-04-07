const express = require('express');
const { renderAddProduct, postAddProduct } = require('../controllers/productController');
const bodyParser = require('body-parser');
const { auth } = require('../middlewares/auth');
const router = express.Router();


router.use(bodyParser.urlencoded());

router.get('/', auth, renderAddProduct);
router.post('/', auth, postAddProduct);

module.exports = router;