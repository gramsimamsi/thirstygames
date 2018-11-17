let express = require('express');
var router = express.Router();
let userController = require("../controllers/usersController");

/* GET all users listing. */
router.get('/', userController.user_list);

/*POST a new user*/
router.post('/:id', userController.new_user_post);

module.exports = router;
