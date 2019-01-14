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
              return next(err);
            }
            res.status(200).send(teamNameList);
          });
    },
    single_team_delete(req, res, next) {
      // delete a single team by its team_id
      TeamModel.deleteOne({_id: req.params._id})
          .exec((err) => {
            if (err) {
              res.status(404).send();
            } else {
              res.status(204).send();
            }
          });
    },
    /* create a new team*/
    single_team_post(req, res, next) {
      if (req.body.team_name === undefined) {
        res.status(400).send();
      } else {
        // create team and add to database
        req.body.team_alc_count = 0;
        const newTeam = new TeamModel(req.body);
        newTeam.save((err, createdTeam) => {
          if (err) {
            return next(err);
          }
          // ToDo remove console.log()
          console.log('New Team: ' + newTeam);
          res.status(201).send(createdTeam);
        });
      }
    },
    /* update a team*/
    single_team_put(req, res, next) {
      if (req.body.team_alc_count === undefined ||
          req.body.team_name === undefined) {
        res.status(400).send();
      } else {
        // update team in the database
        TeamModel.updateOne(
            {_id: req.params._id},
            {
              team_name: req.body.team_name,
              team_alc_count: req.body.team_alc_count,
            })
            .exec((err) => {
              if (err) {
                return next(err);
              }
              TeamModel.find(
                  {_id: req.params._id}, {
                    team_name: req.body.team_name,
                    team_alc_count: req.body.team_alc_count,
                  })
                  .exec((err, updatedTeam) => {
                    if (err) {
                      return next(err);
                    }
                    webSocketServer.clients.forEach((client) => {
                      if (client.readyState === webSocket.OPEN) {
                        client.send(JSON.stringify(updatedTeam));
                      }
                    });
                    res.status(200).send(updatedTeam[0]);
                  });
            });
      }
    },
  };
};
