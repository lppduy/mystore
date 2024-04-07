const express = require('express');
const router = express.Router();
const { renderSignUp, registerUser, renderLogin } = require('../controllers/userAuthController');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded());
router.get('/sign-up', renderSignUp);
router.post('/sign-up', registerUser);
router.get('/login', renderLogin);
router.post('/login',);

module.exports = router;