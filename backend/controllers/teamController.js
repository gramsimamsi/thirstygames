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
            res.send("All teams where deleted successfully");
        });
}



