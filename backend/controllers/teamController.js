let teamModel = require('../models/teamModel');

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
            res.status(200).send(team_name_list);
        });
};

exports.all_teams_delete = function(req, res)
{
    //delete all events
    teamModel.deleteMany({})
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.status(204).send();
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
            res.status(200).send(single_team_name);
        });
}

exports.single_team_delete = function(req, res)
{
    //delete a single team by its team_id
    teamModel.deleteOne({team_id: req.params.team_id})
        .exec(function (err)
        {
            if(err)
            {
                return next(err);
            }
            res.status(204).send();
        });
}

/*create a new team*/
exports.single_team_post = function(req, res)
{
    //create team and add to database
    teamModel.countDocuments({}, function (err, count) {
        req.body.team_id = 'team_' + count;
        let newTeam = new teamModel( req.body );
        newTeam.save(function (err)
        {
            if (err) {
                return next(err);
            }
            //ToDo remove console.log()
            console.log('New Team: ' + newTeam);
            res.status(201).send();
        });
    });
}

/*update a new team*/
exports.single_team_put = function(req, res)
{
    //update team in the database
    teamModel.updateOne({team_id: req.params.team_id}, req.body)
        .exec(function (err)
        {
            if(err){
                return next(err);
            }
            res.status(200).send();
        });
}


