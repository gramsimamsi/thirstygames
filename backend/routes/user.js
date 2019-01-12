const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const userController = require('../controllers/userController');

/*
    ALL USERS
 */
router.get(
    '/',
    middleware.checkToken,
    middleware.isAdmin,
    userController.all_users_get);
/*
       END ALL USERS
 */

/*
    SINGLE USER
 */
router.delete(
    '/:_id',
    middleware.checkToken,
    middleware.isAdmin,
    userController.single_user_delete);
// create user -> no check for token or role obviously
router.post(
    '/',
    userController.single_user_post);
router.put(
    '/:_id',
    middleware.checkToken,
    middleware.isAdmin,
    userController.single_user_put);
/*
    SINGLE USER END
 */


module.exports = router;
