let express = require('express');
let router = express.Router();
let userController = require("../controllers/usersController");


/*
    ALL USERS
 */
router.get('/', userController.all_users_get);
router.delete('/', userController.all_users_delete);
/*
       END ALL USERS
 */

/*
    SINGLE USER
 */
router.get('/:user_id', userController.single_user_get);
router.delete('/:user_id', userController.single_user_delete);
router.post('/', userController.single_user_post);
/*
router.put('/:id', userController.single_user_put);
'/
/*
    SINGLE USER END
 */


module.exports = router;
