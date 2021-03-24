module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: 'You are not authorized to be here' });
  }
};