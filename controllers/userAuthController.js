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