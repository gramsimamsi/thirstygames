const TeamModel = require('../models/teamModel');
const webSocket = require('ws');


module.exports = (webSocketServer) => {
  return {
    // Display list of all users.
    all_teams_get(req, res, next) {
      // find all users in database
      TeamModel.find({}, {_id: 1, team_name: 1, team_alc_count: 1})
          .exec((err, teamNameList) => {
            if (err) {
              TeamModel.find({_id: req.params._id})
                  .exec((err) => {
                    if (err) {
                      res.status(400).send();
                    }
                  });
              return next(err);
            }
            res.status(200).send(teamNameList);
          });
    },
    single_team_delete(req, res, next) {
      // delete a single team by its team_id
      TeamModel.deleteOne({_id: req.params._id})
          .exec(function(err) {
            if (err) {
              TeamModel.find({_id: req.params._id})
                  .exec((err) => {
                    if (err) {
                      res.status(400).send();
                    }
                  });
              return next(err);
            }
            res.status(204).send();
          });
    },
    /* create a new team*/
    single_team_post(req, res, next) {
      if (!req.body.team_name || !req.body.team_alc_count) {
        res.status(400).send();
      }
      // create team and add to database
      const newTeam = new TeamModel( req.body );
      newTeam.save(function(err, createdTeam) {
        if (err) {
          return next(err);
        }
        // ToDo remove console.log()
        console.log('New Team: ' + newTeam);
        res.status(201).send(createdTeam);
      });
    },
    /* update a team*/
    // TODO : this returns an array containing a single team as response. return only the team and TELL LUKAS, please :)
    single_team_put(req, res, next) {
      if (!req.body.team_alc_count || !req.body.team_name) {
        res.status(400).send();
      }
      // update team in the database
      TeamModel.updateOne(
          {_id: req.params._id},
          {team_name: req.body.team_name,
            team_alc_count: req.body.team_alc_count})
          .exec(function(err) {
            if (err) {
              return next(err);
            }
            TeamModel.find(
                {_id: req.params._id}, {
                  team_name: req.body.team_name,
                  team_alc_count: req.body.team_alc_count})
                .exec(function(err, updatedTeam) {
                  if (err) {
                    return next(err);
                  }
                  webSocketServer.clients.forEach((client) => {
                    if (client.readyState === webSocket.OPEN) {
                      client.send(JSON.stringify(updatedTeam));
                    }
                  });
                  res.status(200).send(updatedTeam);
                });
          });
    },
  };
};
