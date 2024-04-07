const Users = require('../models/users');

exports.renderSignUp = (req, res) => {
  const cookie = req.session.isLoggedIn;
  res.render('sign-up', { isLoggedIn: cookie });
}

exports.registerUser = (req, res) => {
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

exports.renderLogin = (req, res) => {
  const cookie = req.session.isLoggedIn;
  res.render('login', { isLoggedIn: cookie });
}


exports.validateLogin = (req, res) => {
  const { userName, password } = req.body;

  Users.fetchUserByUserName(userName)
    .then(([[userCredentials], tInfo]) => {
      if (userCredentials) {
        if (userCredentials.password === password) {
          // res.cookie('isLoggedIn', 'true');
          req.session.isLoggedIn = 'true';
          res.redirect('/');
        } else {
          // res.cookie('isLoggedIn', 'invalidPassword');
          req.session.isLoggedIn = 'invalidPassword';
          res.redirect('/login');
        }
      } else {
        // res.cookie('isLoggedIn', 'invalidUsername');
        req.session.isLoggedIn = 'invalidUsername';
        res.redirect('/login');
      }
    })
}

exports.logout = (req, res) => {
  // req.session.isLoggedIn = 'false';
  req.session.destroy(req.session.id);
  res.redirect('/');
}

