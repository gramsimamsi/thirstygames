const express = require('express');
const router = express.Router();
const LoginHandler = require('../utilities/LoginHandler');

const loginHandler = new LoginHandler();

/* GET home page. */
router.get('/', loginHandler.index);

module.exports = router;
