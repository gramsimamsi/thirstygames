/*
In general I guess we can summarize a lot of logic in this file

First I will use it only for JWT as explained in this tutorial -> https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
 */

let jwt = require('jsonwebtoken');
const config = require('./jwtConfig');

let checkToken = (req, res, next) =>
{
    let token = req.headers['x-access-token'] || req.headers['authorization']; //Express headers

    if(token)
    {
        if(token.startsWith('Bearer '))
        {
            //Remove Bearer from String
            token = token.slice(7, token.length);
        }
    //now we can proceed with token

        //provided token is invalid
        jwt.verify(token, config.secret, (err, decoded) =>
        {
           if(err)
           {
               return res.json({
                   success: false,
                   message: res.status(401),
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
        return res.json({
            success: false,
            message: res.status(401),
        });
    }
};

//export so other modules can use it
module.exports =
    {
        checkToken: checkToken
    }

