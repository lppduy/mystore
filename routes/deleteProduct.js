const express = require('express');
const { deleteProduct } = require('../controllers/productController');
const router = express.Router();


router.get('/:id', deleteProduct)

module.exports = router;