/** *****************************************
 user Schema

 Passwort-Hashing from Stackeoverflow -> https://stackoverflow.com/questions/14588032/mongoose-password-hashing
 ************************/

const mongoose = require('mongoose');
bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      // _id should be defined by default
      user_name: {type: String, required: true, max: 100},
      user_password: {type: String, required: true, max: 100},
      user_role: {type: Number, required: true},
      user_refresh_token: {type: String, required: false},
      // will be set by application automatically
    }
);
// create hock to hash password before save function is executed
UserSchema.pre('save', function(next) {
  const user = this;
  if (user.user_password === undefined) {
    return next();
  }
  UserSchema.methods.hashPassword(user.user_password).then(function(hash) {
    user.user_password = hash;
    next();
  }).catch(function(err) {
    console.log('Could not hash new User password' + err.toString());
    next();
  });
});

/*
 * candidate password is hashed implizite
 * -> use this function to hash passwords before store them in DB
  */
UserSchema.methods.hashPassword = function(passwordToHash) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(passwordToHash, SALT_WORK_FACTOR, function(err, hash) {
      if (err) {
        reject(new Error('Can not hash password'));
      } else {
        resolve(hash);
      }
    });
  });
};

UserSchema.methods.comparePassword = function(candidatePassword, userPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword, userPassword, function(err, isMatch) {
      if (err) {
        reject(new Error('Error checking use password'));
      } else {
        resolve(isMatch);
      }
    });
  });
};

// Export model
module.exports = mongoose.model('User', UserSchema);


