let userModel = require('../models/userModel');
let jwt = require('jsonwebtoken');
let config = require('../jwtConfig');


exports.token_refresh = function(req, res)
{
    //request contains username and refreshtoken
    let username = req.body.user_name;
    let refreshToken = req.body.user_refresh_token;

    console.log(username);
    console.log(refreshToken);


    if(username && refreshToken)
    {
        userModel.findOne({user_name: username}).exec(function(err, user)
        {
            if(err)
            {
                console.log("token_refresh could not find user in db");
                res.status(500).json({
                    message: "COULD NOT REFRESH ACCESSTOKEN"
                }).send();
            }
            else
            {
                //console.log("db-token -> " + user.user_refresh_token.toString() + " send token -> " + refreshToken.toString());
                if(user.user_refresh_token === refreshToken)
                {
                    let token = jwt.sign({username: username}, config.secret, {expiresIn: config.tokenExpirationTime});
                    res.status(200).json({
                        success: true,
                        message: 'REFRESH ACCESSTOKEN SUCCESSFULL',
                        token: token,
                        refreshToken: refreshToken
                    }).send();
                }
                else
                {
                    console.log("token do not match");
                    res.status(500).json({
                        message: "COULD NOT REFRESH ACCESSTOKEN"
                    }).send();
                }
            }
        })
    }
};