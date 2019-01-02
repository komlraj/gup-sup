const mongoose = require('mongoose');
const SALT_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
});

userSchema.methods.verifyPassword = function(userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function(err, res) {
    if(err) cb(err, false);
    cb(null, res);
  });
};

userSchema.pre('save', function(next){
  var password = this.password;
  var self = this;

  if(this.isModified(this.password)) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      // Store hash in your password DB.
      self.password = hash;
      next();
    });
  })
});

const User = mongoose.model('User', userSchema);

module.exports = User;
