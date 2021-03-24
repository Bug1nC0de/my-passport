const router = require('express').Router();
const isAuth = require('../mw/isAuth');

router.get('/', isAuth, (req, res) => {
  res.send('valid user');
});

module.exports = router;
