let userController = require('../controllers/usersController');
let loginHandlerClass = require('../utilities/LoginHandler');

exports.single_user_login = function(req, res)
{
    new loginHandlerClass().login(req, res);
}

