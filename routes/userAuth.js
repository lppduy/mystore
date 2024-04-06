const express = require('express');
const router = express.Router();
const { renderSignUp, registerUser } = require('../controllers/userAuthController');

router.get('/sign-up', renderSignUp);
router.post('/sign-up', registerUser);

module.exports = router;