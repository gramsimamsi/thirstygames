const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const teamControllerFunction = require('../controllers/teamController');


module.exports = (webSocketServer) => {
  const teamController = teamControllerFunction(webSocketServer);
  /*
        ALL TEAMS
     */

  router.get(
      '/',
      // middleware.checkToken,
      // middleware.isBarkeeper,
      teamController.all_teams_get);

  /*
        SINGLE TEAM
     */
  router.delete(
      '/:_id',
      middleware.checkToken,
      middleware.isAdmin,
      teamController.single_team_delete);
  router.post(
      '/',
      middleware.checkToken,
      middleware.isAdmin,
      teamController.single_team_post);
  router.put(
      '/:_id',
      middleware.checkToken,
      middleware.isBarkeeper,
      teamController.single_team_put);

  return router;
};
