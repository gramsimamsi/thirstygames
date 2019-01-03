let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let beverageController = require("../controllers/beverageController");

/*
    ALL BEVERAGES
*/

router.get('/', middleware.checkToken, middleware.isBarkeeper,beverageController.all_beverages_get);

module.exports = router;
