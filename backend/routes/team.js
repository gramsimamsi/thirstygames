let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let teamController = require("../controllers/teamController");


/*
    ALL TEAMS
 */

router.get('/', middleware.checkToken, middleware.isBarkeeper, teamController.all_teams_get);

/*
    SINGLE TEAM
 */
router.delete('/:_id', middleware.checkToken, middleware.isAdmin, teamController.single_team_delete);
router.post('/', middleware.checkToken, middleware.isAdmin, teamController.single_team_post);
router.put('/:_id', middleware.checkToken, middleware.isBarkeeper, teamController.single_team_put);


//Todo remove
/*Beverage Counter per Team*/
/*
router.post('/countAlc', teamController.count_alc_post);
router.get('/getScore', teamController.score_get);
router.post('/resetCounter', teamController.counter_reset_post);
*/

module.exports = router;
