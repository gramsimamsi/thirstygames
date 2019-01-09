let teamModel = require('../models/teamModel');
let team = require('../routes/team');
let webSocket = require('ws');


module.exports = (webSocketServer) => {
    return {
        // Display list of all users.
        all_teams_get (req, res, next) {
            //find all users in database
            teamModel.find({}, {_id : 1, team_name : 1, team_alc_count : 1})
                .exec(function (err, team_name_list)
                {
                    if(err)
                    {
                        return next(err);
                    }
                    res.status(200).send(team_name_list);
                });
        },
        single_team_delete (req, res, next)
        {
            //delete a single team by its team_id
            teamModel.deleteOne({_id: req.params._id})
                .exec(function (err)
                {
                    if(err)
                    {
                        return next(err);
                    }
                    res.status(204).send();
                });
        },
        /*create a new team*/
        single_team_post (req, res, next)
        {
            //create team and add to database
            let newTeam = new teamModel( req.body );
            newTeam.save(function (err, created_team)
            {
                if (err) {
                    return next(err);
                }
                //ToDo remove console.log()
                console.log('New Team: ' + newTeam);
                res.status(201).send(created_team);
            });
        },
        /*update a team*/
        single_team_put (req, res, next)
        {
            if(!req.body.team_alc_count || !req.body.team_name)
            {
                return res.status(400).send();
            }
            //update team in the database
            teamModel.updateOne({_id: req.params._id}, {team_name : req.body.team_name, team_alc_count : req.body.team_alc_count})
                .exec(function (err)
                {
                    if(err) {
                        return next(err);
                    }
                    teamModel.find({_id : req.params._id},{team_name: req.body.team_name, team_alc_count: req.body.team_alc_count})
                        .exec(function (err, updated_team) {
                            if(err)
                            {
                                return next(err);
                            }
                            webSocketServer.clients.forEach((client) => {
                                if (client.readyState === webSocket.OPEN) {
                                    client.send(JSON.stringify(updated_team));
                                }
                            });
                            res.status(200).send(updated_team);
                        });
                });
        }
    }
}