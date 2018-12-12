let express = require('express');
let router = express.Router();
let loginController = require("../controllers/loginController");


/*
    SINGLE USER
 */
router.get('/:user_name:user_password', loginController.single_user_login);
router.post('/', loginController.single_user_create);
/*
    SINGLE USER END
 */


module.exports = router;
