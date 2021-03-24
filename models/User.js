const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'facebook', 'google'],
    required: true,
  },
  local: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  facebook: {
    facebookId: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  google: {
    googleId: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
});

module.exports = mongoose.model('user', UserSchema);
