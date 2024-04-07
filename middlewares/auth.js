const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../utils/globals');

global.isLoggedIn = 'init';

exports.auth = (req, res, next) => {
  const token = req.session.token;
  if (req.path === '/logout') {
    global.isLoggedIn = 'init';
    next();
  } else {

    try {
      const decodedToken = JWT.verify(token, tokenSignature);
      global.isloggedIn = 'true';
    } catch (error) {
      if (global.isLoggedIn === 'init') {
        next();
      } else {
        global.isLoggedIn = 'false';
        res.redirect('/login');
      }
    }
  }

  next();
}