let express = require('express');
let router = express.Router();
let LoginHandler = require('../utilities/LoginHandler')
let indexController = require("../controllers/indexController");

let loginHandler = new LoginHandler();
/* GET home page. */
router.get('/', loginHandler.index, function(req, res, next) {
  res.render('index', { title: 'welcome to thirsty games :D ' });
});

module.exports = router;
