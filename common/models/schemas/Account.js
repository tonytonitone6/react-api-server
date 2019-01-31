const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;


const schema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String
  },
  createTime: {
    type: Date
  }
});

schema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    })
  })
});

schema.methods.comparePassword = (password, userPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, userPassword, (err, isMatch) => {
      isMatch ? resolve({success: true}) : reject({success: false, errMsg: 'password is failure'});
    });
  });
};

const model = mongoose.model('Account', schema, 'accounts');

module.exports = model;