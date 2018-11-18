var teamModel = require('../models/teamModel');

// Display list of all users.
exports.all_teams_get = function(req, res) {
    //find all users in database
    teamModel.find({})
        .exec(function (err, team_name_list)
        {
            if(err)
            {
                return next(err);
            }
            res.send(team_name_list);
        });
};

exports.all_teams_delete = function(req, res)
{
    //delete all events
    teamModel.remove({})
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.send('All teams where deleted successfully');
        });
}

exports.single_team_get = function(req, res)
{
    //get a single team by his team_id
    teamModel.find({team_id: req.params.team_id})
        .exec(function (err, single_team_name)
        {
            if(err){
                return next(err);
            }
            res.send(single_team_name);
        });
}

exports.single_team_delete = function(req, res)
{
    //delete a single team by its team_id
    teamModel.remove({team_id: req.params.team_id})
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.send('Team was removed successfully');
        });
}


