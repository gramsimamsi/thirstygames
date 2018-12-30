const express = require('express');
let userModel = require('../models/userModel');

let jwt = require('jsonwebtoken');
let config = require('../jwtConfig');


class LoginHandler
{
    login(req, res)
    {
        let username = req.body.user_name;
        let password = req.body.user_password;

        if(username && password)
        {
            userModel.findOne({user_name: username}).exec(function(err, user)
            {
                /*
                if (err)
                {
                    console.log("Error in LoginHandler.js findOne -> " + err.toString());
                    res.status(401).json({
                        success: false,
                        message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                    });
                    return;
                }
                */

                if(user)
                {
                    user.comparePassword(password, user.user_password).then(function (isMatch)
                    {
                        if(isMatch)
                        {
                            console.log(user.user_role);
                            let token = jwt.sign({username: username, "userRole": user.user_role}, config.secret, {expiresIn: config.tokenExpirationTime});
                            let refreshToken = jwt.sign({username: username, "userRole": user.user_role}, config.refreshSecret, {expiresIn: config.refreshTokenExpirationTime});

                            // save refresh-token in DB with every login
                            userModel.findOneAndUpdate({user_name: username}, {user_refresh_token: refreshToken}, {upsert:true}, function(err, doc)
                            {
                                if(err)
                                {
                                    console.log("could not update " + username.toString() + " with new refreshToken");
                                    res.status(401).json({
                                        success:false,
                                        message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                                    });
                                }
                                else
                                {
                                    res.status(200).json({
                                        success: true,
                                        message: 'AUTHENTICATION SUCCESSFULL',
                                        token: token,
                                        refreshToken: refreshToken
                                    });
                                }
                            })
                        }
                        else
                        {
                            //no error, but nothing found
                            res.status(401).json({
                                success:false,
                                message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                            });
                        }
                    }).catch(function (err)
                    {
                        if (err)
                        {
                            console.log("catch -> " + err.toString());
                            res.status(401).json({
                                success: false,
                                message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                            });
                        }
                    })
                }
                else
                {
                    res.status(401).json({
                        success:false,
                        message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                    });
                }

            });
        }
        else
        {
            res.status(401);
            console.log("Username ->" + username + " Passwort ->" + password);
        }
    }

    index (req, res)
    {
        res.sendStatus(200).json({
            success: true,
            message: 'INDEX PAGE'
        });
    }
}

module.exports = LoginHandler;
