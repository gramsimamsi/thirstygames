const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const beverageController = require('../controllers/beverageController');

/*
    ALL BEVERAGES
*/

router.get(
    '/',
    middleware.checkToken,
    middleware.isBarkeeper,
    beverageController.all_beverages_get
);

module.exports = router;
