let express = require('express');
var router = express.Router();
let userController = require("../controllers/usersController");


/*
    ALL USERS
 */
router.get('/', userController.all_users_get);
router.delete('/', userController.all_users_delete)
/*
       END ALL USERS
 */

/*
    SINGLE USER
 */
router.get('/:id', userController.single_user_get)
router.post('/:id', userController.single_user_post);
router.delete('/:id', userController.single_user_delete);
router.put('/:id', userController.single_user_put);
/*
    SINGLE USER END
 */





module.exports = router;
