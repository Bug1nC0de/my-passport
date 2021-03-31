const facebook = require('passport-facebook').Strategy;
const google = require('passport-google-oauth20').Strategy;
const local = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('./keys');

module.exports = (passport) => {
  //Serialize & Deserialize//
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  //Local Strategy//
  passport.use(
    new local(function (username, password, done) {
      User.findOne({ 'local.email': username }, function (err, user) {
        if (err) {
          // Always be consistent with the pattern you're returning
          // you return as follows (error, user, info)
          // In which will be received in your 'login' route
          return done(err, false, { msg: 'Invalid Credentials' });
        }
        if (!user) {
          return done(null, false, { msg: 'Invalid Credetials' });
        }
        // Used compareSync as it will return immediate response
        // instead of `compare` which will return promise
        const isMatch = bcrypt.compareSync(password, user.local.password);
        if (!isMatch) {
          return done(null, false, { msg: 'Invalid credentials' });
        }
        return done(null, user);
      });
    })
  );

  //Facebook Strategy//
  passport.use(
    new facebook(
      {
        clientID: keys.FACEBOOK_APP_ID,
        clientSecret: keys.FACEBOOK_APP_SECRET,
        callbackURL: `${keys.url}/auth/facebook/callback`,
        profileFields: ['id', 'name', 'email'],
      },
      async (token, refreshToken, profile, done) => {
        //Check to see if user exists
        const existingUser = await User.findOne({
          'facebook.facebookId': profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        //If user does not exist, create New user//
        const user = await new User({
          method: 'facebook',
          facebook: {
            facebookId: profile.id,
            name: profile.name.givenName,
            email: profile.emails[0].value,
          },
        });

        await user.save();
        return done(null, user);
      }
    )
  );

  //Google Strategy//
  passport.use(
    new google(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: `${keys.url}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        //Check to see if user exists
        const existingUser = await User.findOne({
          'google.googleId': profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }
        //If user does not Exist, Create New user//
        const user = await new User({
          method: 'google',
          google: {
            googleId: profile.id,
            name: profile.name.givenName,
            email: profile.emails[0].value,
          },
        });

        await user.save();
        return done(null, user);
      }
    )
  );
};
