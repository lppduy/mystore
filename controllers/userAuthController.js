const Users = require('../models/users');

exports.renderSignUp = (req, res) => {
  res.render('sign-up');
}

exports.registerUser = (req, res) => {
  const { userName, password, confirmPassword } = req.body;
  console.log(userName, password, confirmPassword);
  const users = new Users(null, userName, password);

  users.insertUser()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/sign-up');
    })
}

exports.renderLogin = (req, res) => {
  const cookie = req.cookies;
  res.render('login', { isLoggedIn: cookie.isLoggedIn });
}


exports.validateLogin = (req, res) => {
  const { userName, password } = req.body;

  Users.fetchUserByUserName(userName)
    .then(([[userCredentials], tInfo]) => {
      if (userCredentials) {
        if (userCredentials.password === password) {
          res.cookie('isLoggedIn', 'true');
          res.redirect('/');
        } else {
          res.cookie('isLoggedIn', 'invalidPassword');
          res.redirect('/login');
        }
      } else {
        res.cookie('isLoggedIn', 'invalidUsername');
        res.redirect('/login');
      }

    })
}

exports.logout = (req, res) => {
  res.cookie('isLoggedIn', 'false');
  res.redirect('/');
}

