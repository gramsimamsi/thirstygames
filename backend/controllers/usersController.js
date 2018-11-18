var userModel = require('../models/userModel');

// Display list of all users.
exports.all_users_get = function(req, res) {
    //find all users in database
    userModel.find({})
        .exec(function (err, user_name_list)
    {
        if(err)
        {
            return next(err);
        }
        res.send(user_name_list);
    });
};

exports.all_users_delete = function(req, res)
{
    //delete all users
    userModel.remove({})
        .exec(function(err)
    {
        if(err){
            return next(err);
        }
        res.send("All users where deleted successfully");
    });
}

exports.single_user_get = function(req, res)
{
    //get a single user by his user_id
    userModel.find({user_id: req.params.user_id})
        .exec(function (err, single_user_name)
    {
        if(err){
            return next(err);
        }
        res.send(single_user_name);
    });
}

/*create a new user*/
exports.single_user_post = function(req, res)
{
    //create user and add to database
    res.send("User Creation not implemented yet" + req.params.id);
}
/*
// Display detail page for a specific Author.
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};

*/