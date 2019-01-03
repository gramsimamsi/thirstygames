let loginHandlerClass = require('../utilities/LoginHandler');
let login = require('../routes/login');

login.single_user_login = function(req, res)
{
    new loginHandlerClass().login(req, res);
}

module.exports = login;

