const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('cookie-session');
const path = require('path');
const keys = require('./config/keys');
require('./config/passport')(passport);
connectDB();
const app = express();

//App configuration//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup the cookie-session//
app.use(
  session({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

//Initialize Passport//
app.use(passport.initialize());
app.use(passport.session());

//Require Routes//
app.use(require('./routes'));

//Use react front end//
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Configure Server Port and run the server//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Login App Running on port ${PORT}`));
