let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let beverageController = require("../controllers/beverageController");

/*
    ALL BEVERAGES
*/

router.get('/', middleware.checkToken, middleware.isBarkeeper,beverageController.all_beverages_get);
router.delete('/', middleware.checkToken, middleware.isAdmin, beverageController.all_beverages_delete);

/*
    SINGLE BEVERAGE
 */
router.get('/:beverage_id', middleware.checkToken, middleware.isAdmin, beverageController.single_beverage_get);
router.delete('/:beverage_id', middleware.checkToken, middleware.isAdmin, beverageController.single_beverage_delete);
router.post('/', middleware.checkToken, middleware.isAdmin, beverageController.single_beverage_post);
router.put('/:beverage_id', middleware.checkToken, middleware.isAdmin, beverageController.single_beverage_put);

module.exports = router;
