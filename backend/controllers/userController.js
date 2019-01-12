const UserModel = require('../models/userModel');
const users = require('../routes/user');

// Display list of all users.
users.all_users_get = function(req, res, next) {
  // find all users in database
  UserModel.find({}, {_id: 1, user_name: 1, user_role: 1})
      .exec(function(err, userNameList) {
        if (err) {
          return next(err);
        }
        res.status(200).send(userNameList);
      });
};

users.single_user_delete = function(req, res, next) {
  UserModel.deleteOne({_id: req.params._id})
      .exec(function(err) {
        if (err) {
          // ToDo delete console log
          console.log(err.toString());
          return next(err);
        }
        res.status(204).send();
      });
};

/* create a new user*/
users.single_user_post = function(req, res) {
  // create user and add to database
  // Todo change role of newly created user to 2 or higher
  req.body.user_role = 1;

  new UserModel(req.body).save((err, createdUser) => {
    if (err) {
      res.status(500).json({
        // ToDo remove message and just .send() instead of .json()
        message: 'COULD NOT CREATE NEW USER',
      });
    }
    // ToDo remove console.log()
    console.log('User created successfully');
    res.status(201).json({
      '_id': createdUser._id,
      'user_name': createdUser.user_name,
      'user_role': createdUser.user_role,
    });
  });
};

/* update a new user*/
users.single_user_put = function(req, res, next) {
  if (!req.body.user_role) {
    return res.status(400).send();
  }
  // update user in the database
  UserModel.updateOne({_id: req.params._id}, {user_role: req.body.user_role})
      .exec(function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).send();
      });
};

module.exports = users;
