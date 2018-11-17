let express = require('express');
let router = express.Router();
let teamController = require("../controllers/teamController");


/*
    ALL TEAMS
 */

router.get('/', teamController.all_teams_get);
/*
router.delete('/', teamController.all_teams_delete);
*/
/*
    SINGLE TEAM
 */
/*
router.get('/:id', teamController.single_team_get);
router.post('/:id', teamController.single_team_post);
router.put('/:id', teamController.single_team_put);
router.delete('/:id'), teamController.single_team_delete;
*/

/*Beverage Counter per Team*/
/*
router.post('/countAlc', teamController.count_alc_post);
router.get('/getScore', teamController.score_get);
router.post('/resetCounter', teamController.counter_reset_post);
*/

module.exports = router;
