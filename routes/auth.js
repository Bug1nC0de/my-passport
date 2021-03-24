const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
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
router.post('/register', async (req, res) => {
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
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  async (req, res) => {
    const payload = {
      user: {
        id: req.user._id,
      },
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: '2d' }, (err, token) => {
      if (err) throw err;
      console.log(token);
    });

    const user = await User.findById(req.user._id).select('-local.password');
    res.json(user);
  }
);

//Facebook Login Route//
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failure: '/',
  }),
  (req, res) => {
    const payload = {
      user: {
        id: req.user._id,
      },
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: '2d' }, (err, token) => {
      if (err) throw err;
      console.log(token);
    });

    res.redirect('/profile');
  }
);

//Google Login Route//
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const payload = {
      user: {
        id: req.user._id,
      },
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: '2d' }, (err, token) => {
      if (err) throw err;
      console.log(token);
    });
    res.redirect('/profile');
  }
);

//Log User Out//
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
