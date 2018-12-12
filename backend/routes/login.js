let express = require('express');
let router = express.Router();
let loginController = require("../controllers/loginController");


/*
    SINGLE USER
 */
router.post('/', loginController.single_user_login);
/*
    SINGLE USER END
 */


module.exports = router;
