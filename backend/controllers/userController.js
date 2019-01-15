const UserModel = require('../models/userModel');
const users = require('../routes/user');

// Display list of all users.
users.all_users_get = (req, res, next) => {
  // find all users in database
  UserModel.find({}, {_id: 1, user_name: 1, user_role: 1})
      .exec((err, userNameList) => {
        if (err) {
          return next(err);
        }
        res.status(200).send(userNameList);
      });
};

users.single_user_delete = (req, res) => {
  UserModel.deleteOne({_id: req.params._id})
      .exec((err) => {
        if (err) {
          res.status(404).send();
        } else {
          res.status(204).send();
        }
      });
};

/* create a new user*/
users.single_user_post = (req, res, next) => {
  if (req.body.user_name === undefined ||
    req.body.user_password === undefined) {
    res.status(400).send();
  } else if (req.body.user_password.length <= 6) {
    res.status(400).json({
      'message': 'password is to short',
    });
  } else {
    // create user and add to database
    req.body.user_role = 2;

    new UserModel(req.body).save((err, createdUser) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        '_id': createdUser._id,
        'user_name': createdUser.user_name,
        'user_role': createdUser.user_role,
      });
    });
  }
};

/* update a new user*/
users.single_user_put = (req, res, next) => {
  if (req.body.user_role === undefined) {
    res.status(400).send();
  } else {
    // update user in the database
    UserModel.updateOne({_id: req.params._id}, {user_role: req.body.user_role})
        .exec((err) => {
          if (err) {
            return next(err);
          }
          res.status(200).send();
        });
  }
};

module.exports = users;
