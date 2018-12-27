let express = require('express');
let router = express.Router();
let LoginHandler = require('../utilities/LoginHandler')

let loginHandler = new LoginHandler();

/* GET home page. */
router.get('/', loginHandler.index);

module.exports = router;
