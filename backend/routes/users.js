let express = require('express');
let router = express.Router();
let middleware = require('../middleware');
let userController = require("../controllers/usersController");

/*
    ALL USERS
 */
router.get('/', middleware.checkToken, userController.all_users_get);
router.delete('/', middleware.checkToken, userController.all_users_delete);
/*
       END ALL USERS
 */

/*
    SINGLE USER
 */
router.get('/:user_id', middleware.checkToken, userController.single_user_get);
router.delete('/:user_id', middleware.checkToken, userController.single_user_delete);
router.post('/',userController.single_user_post);
router.put('/:user_id', middleware.checkToken, userController.single_user_put);
/*
    SINGLE USER END
 */


module.exports = router;
