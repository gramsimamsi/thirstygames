let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let userController = require("../controllers/usersController");

/*
    ALL USERS
 */
router.get('/', middleware.checkToken, middleware.isAdmin, userController.all_users_get);
//router.delete('/', middleware.checkToken, userController.all_users_delete);
/*
       END ALL USERS
 */

/*
    SINGLE USER
 */
router.get('/:_id', middleware.checkToken,  middleware.isAdmin,userController.single_user_get);
router.delete('/:_id', middleware.checkToken,  middleware.isAdmin,userController.single_user_delete);
router.post('/',userController.single_user_post); //create user -> no check for token or role obviously
router.put('/:_id', middleware.checkToken,  middleware.isAdmin,userController.single_user_put);
/*
    SINGLE USER END
 */


module.exports = router;
