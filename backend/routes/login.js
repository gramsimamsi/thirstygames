let express = require('express');
let router = express.Router();
let loginController = require("../controllers/loginController");

router.post('/', loginController.single_user_login);


module.exports = router;
