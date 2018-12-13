let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let tokenController = require("../controllers/tokenController");

router.post('/',tokenController.token_refresh);

module.exports = router;
