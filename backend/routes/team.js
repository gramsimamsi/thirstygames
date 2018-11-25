let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let teamController = require("../controllers/teamController");


/*
    ALL TEAMS
 */

router.get('/', middleware.checkToken, teamController.all_teams_get);

router.delete('/', middleware.checkToken, teamController.all_teams_delete);

/*
    SINGLE TEAM
 */
router.get('/:team_id', middleware.checkToken, teamController.single_team_get);
router.delete('/:team_id', middleware.checkToken, teamController.single_team_delete);
router.post('/', middleware.checkToken, teamController.single_team_post);
router.put('/:team_id', middleware.checkToken, teamController.single_team_put);


/*Beverage Counter per Team*/
/*
router.post('/countAlc', teamController.count_alc_post);
router.get('/getScore', teamController.score_get);
router.post('/resetCounter', teamController.counter_reset_post);
*/

module.exports = router;
