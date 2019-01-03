let userModel = require('../models/userModel');
let users = require('../routes/users');

// Display list of all users.
users.all_users_get = function(req, res) {
    //find all users in database
    userModel.find({})
        .exec(function (err, user_name_list)
    {
        if(err)
        {
            return next(err);
        }
        res.status(200).send(user_name_list);
    });
};

users.all_users_delete = function(req, res)
{
    //delete all users
    userModel.deleteMany({})
        .exec(function(err)
    {
        if(err){
            return next(err);
        }
        res.status(204).send();
    });
};

users.single_user_get = function(req, res)
{
    //get a single user by his _id
    userModel.find({user_id: req.params._id})
        .exec(function (err, single_user_name)
    {
        if(err){
            return next(err);
        }
        res.status(200).send(single_user_name);
    });
};

users.single_user_delete = function(req, res)
{
    userModel.deleteOne({user_id: req.params._id})
        .exec(function(err) {
            if (err) {
                console.log(req.params._id);
                //ToDo delete console log
                console.log(err.toString());
                return next(err);
            }
            res.status(204).send();
        });
};

/*create a new user*/
users.single_user_post = function(req, res)
{
    //create user and add to database
    userModel.countDocuments({}, function (err, count) {
        req.body.user_id = 'user_' + count;

        //Todo change role of newly created user to 2 or higher
        req.body.user_role = 1;

        new userModel(req.body).save(err => {
            if (err) {
                res.status(500).json({
                    //ToDo remove message and just .send() instead of .json()
                    message: "COULD NOT CREATE NEW USER"
                })
            }
            //ToDo remove console.log()
            console.log("User created successfully");
            res.status(201).send();
        });
    });
};

/*update a new user*/
users.single_user_put = function(req, res)
{
    //update user in the database
    userModel.updateOne({user_id: req.params._id}, req.body)
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.status(200).send();
        });
};

module.exports = users;