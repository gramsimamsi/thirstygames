const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../jwtConfig');
const token = require('../routes/token');

// todo username not required -> find user by refreshtoken and send back
token.token_refresh = (req, res) => {
  // request contains username and refreshtoken
  const username = req.body.user_name;
  const refreshToken = req.body.user_refresh_token;

  if (username && refreshToken) {
    userModel.findOne({user_name: username}).exec((err, user) => {
      if (err) {
        // ToDo remove console.log()
        console.log('token_refresh could not find user in db');
        res.status(500).json({
          // ToDo remove message
          message: 'COULD NOT REFRESH ACCESSTOKEN',
        }).send();
      } else {
        // ToDo remove console.log()
        if (user.user_refresh_token === refreshToken) {
          const token = jwt.sign(
              {'username': username, 'userRole': user.user_role},
              config.secret, {expiresIn: config.tokenExpirationTime});
          res.status(200).json({
            success: true,
            // ToDo remove message
            message: 'REFRESH ACCESSTOKEN SUCCESSFULL',
            token: token,
            refreshToken: refreshToken,
          }).send();
        } else {
          // ToDo remove console.log()
          console.log('token do not match');
          res.status(400).json({
            // ToDo remove message
            message: 'COULD NOT REFRESH ACCESSTOKEN',
          }).send();
        }
      }
    });
  }
};

module.exports = token;
