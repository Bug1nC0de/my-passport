const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const isAuth = require('../mw/isAuth');
const User = require('../models/User');

//Get the current User//
router.get('/current_user', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-local.password');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//Register a Local User//
router.post(
  '/register',
  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Email field may not be empty').isEmail(),
    check(
      'password',
      'Please enter a password that is more than 3 characters'
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;

      //check if email is uinique//
      let emailExist = await User.findOne({ 'local.email': email });
      if (emailExist) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }

      //If email is unique create the new user//
      const user = new User({
        method: 'local',
        local: {
          name: name,
          email: email,
        },
      });

      //hash the password//
      const salt = await bcrypt.genSalt(10);
      user.local.password = await bcrypt.hash(password, salt);
      //Save the user, send success message//
      await user.save();
      return res
        .status(200)
        .json({ msg: [{ msg: 'User Created You may now log in' }] });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

//Local Login Route//
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

//Facebook Login Route//
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

//Facebook Callback Route//
router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    console.log('Facebook Callback: ', req.user);
    res.redirect('/profile');
  }
);

//Google Login Route//
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

//Google Callback Route//
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  console.log('Google Callback: ', req.user);
  res.redirect('/profile');
});

//Log User Out//
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
