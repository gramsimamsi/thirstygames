let userModel = require('../models/userModel');
let jwt = require('jsonwebtoken');
let config = require('../jwtConfig');
let token = require('../routes/token');

//todo username not required -> find user by refreshtoken and send back
token.token_refresh = function(req, res)
{
    //request contains username and refreshtoken
    let username = req.body.user_name;
    let refreshToken = req.body.user_refresh_token;

    if(username && refreshToken)
    {
        userModel.findOne({user_name: username}).exec(function(err, user)
        {
            if(err)
            {
                //ToDo remove console.log()
                console.log("token_refresh could not find user in db");
                res.status(500).json({
                    //ToDo remove message
                    message: "COULD NOT REFRESH ACCESSTOKEN"
                }).send();
            }
            else
            {
                //ToDo remove console.log()
                //console.log("db-token -> " + user.user_refresh_token.toString() + " send token -> " + refreshToken.toString());
                if(user.user_refresh_token === refreshToken)
                {
                    let token = jwt.sign({username: username, "userRole": user.user_role}, config.secret, {expiresIn: config.tokenExpirationTime});
                    res.status(200).json({
                        success: true,
                        //ToDo remove message
                        message: 'REFRESH ACCESSTOKEN SUCCESSFULL',
                        token: token,
                        refreshToken: refreshToken
                    }).send();
                }
                else
                {
                    //ToDo remove console.log()
                    console.log("token do not match");
                    res.status(400).json({
                        //ToDo remove message
                        message: "COULD NOT REFRESH ACCESSTOKEN"
                    }).send();
                }
            }
        })
    }
};

module.exports = token;