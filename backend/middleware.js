/*
In general I guess we can summarize a lot of logic in this file

First I will use it only for JWT as explained in this tutorial -> https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
 */

let jwt = require('jsonwebtoken');
const config = require('./jwtConfig');

let checkToken = (req, res, next) =>
{
    console.log("hello from middleware");
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.body.token || req.params.token || req.query.token; //token can be passed in multiple ways
    console.log("token -> " + token.toString());
    if(token)
    {
        jwt.verify(token, config.secret, (err, decoded) =>
        {
           if(err)
           {
               return res.status(401).json({
                   success: false,
                   message: 'Token invalid',
               });
           }
           else
           {
               req.decoded = decoded;
               next();
           }
        }
        );
    }
    else
    {
        //no token was provided
        return res.status(401).json({
            success: false,
            message: 'Token not provided',
        });
    }
};

//export so other modules can use it
module.exports =
    {
        checkToken: checkToken
    }

