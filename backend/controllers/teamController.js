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



