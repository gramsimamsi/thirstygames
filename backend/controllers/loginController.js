const LoginHandlerClass = require('../utilities/LoginHandler');
const login = require('../routes/login');

login.single_user_login = (req, res) => {
  new LoginHandlerClass().login(req, res);
};

module.exports = login;

