let express = require('express');
var router = express.Router();
let userController = require("../controllers/usersController");

/* GET users listing. */
router.get('/', userController.user_list);

module.exports = router;
