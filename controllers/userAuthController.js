const Users = require('../models/users');
const JWT = require('jsonwebtoken');
const { tokenSignature } = require('../utils/globals');

exports.renderSignUp = (req, res, next) => {
  res.render('sign-up', { isLoggedIn: global.isLoggedIn });
}

exports.registerUser = (req, res, next) => {
  const { userName, password, confirmPassword } = req.body;
  console.log(userName, password, confirmPassword);
  const users = new Users(null, userName, password);

  users.insertUser()
    .then(() => {
      req.session.isLoggedIn = 'true';
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/sign-up');
    })
}

exports.renderLogin = (req, res, next) => {
  const cookie = req.session.isLoggedIn;
  res.render('login', { isLoggedIn: global.isLoggedIn });
}


exports.validateLogin = (req, res, next) => {
  const { userName, password } = req.body;

  Users.fetchUserByUserName(userName)
    .then(([[userCredentials], tInfo]) => {
      if (userCredentials) {
        if (userCredentials.password === password) {
          const token = JWT.sign(
            { userName },
            tokenSignature
          )
          req.session.token = token;
          global.isLoggedIn = 'true';
          res.redirect('/');
        } else {
          global.isLoggedIn = 'false';
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    })
}

exports.logout = (req, res, next) => {
  // req.session.isLoggedIn = 'false';
  req.session.destroy(req.session.id);
  res.redirect('/');
}

