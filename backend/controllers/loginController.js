let userController = require('../controllers/usersController');
let loginHandlerClass = require('../utilities/LoginHandler');

exports.single_user_login = function(req, res)
{
    let loginHandler = new loginHandlerClass();
    loginHandler.login(req, res);
}

/*create a new user*/
exports.single_user_create = function(req, res)
{
    userController.single_user_post(req, res);
}

