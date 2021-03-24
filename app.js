const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo');
const keys = require('./config/keys');
require('./config/passport')(passport);

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: keys.mongoURI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

//Use react front end//
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Login App Running on port ${PORT}`));
