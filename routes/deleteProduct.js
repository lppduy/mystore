const express = require('express');
const { deleteProduct } = require('../controllers/productController');
const { auth } = require('../middlewares/auth');
const router = express.Router();


router.get('/:id', auth, deleteProduct)

module.exports = router;