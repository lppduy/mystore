const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // const cookie = req.get('Cookie');
  // console.log(cookie);
  // res.send('Cookie is set.');
  const expDate = new Date(Date.now() + 5e3);
  // const expDate = new Date(Date.now() + 5e3).toUTCString();
  // res.setHeader('Set-Cookie', `isLoggedIn=true; expires=${expDate}`);
  // res.cookie('isLoggedIn', true, { expires: expDate })
  // res.cookie('isLoggedIn', true, { maxAge: 5000 })
  res.cookie('isLoggedIn', true, {
    expires: expDate,
    httpOnly: true,
    sameSite: 'strict',
    // secure: true
  })
  res.send(expDate);
});

router.post('/', (req, res) => {
  res.cookie('isLoggedIn', true);
  res.send('Cookie is set.');
});

module.exports = router;