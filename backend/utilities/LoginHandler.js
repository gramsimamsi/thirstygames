const express = require('express');
let userModel = require('../models/userModel');

let jwt = require('jsonwebtoken');
let config = require('../jwtConfig');

const TOKEN_EXPIRATION_TIME =  '1h';


class LoginHandler
{
    login(req, res)
    {
        let username = req.body.user_name;
        let password = req.body.user_password;

        console.log(username);
        console.log(password);


        if(username && password)
        {
            userModel.findOne({user_name: username}).exec(function(err, user)
            {
                if (err)
                {
                    console.log("Error in LoginHandler.js findOne -> " + err.toString());
                    //throw err;
                    res.sendStatus(401).json({
                        success: false,
                        message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                    });
                    return;
                }

                user.comparePassword(password, user.user_password).then(function (isMatch)
                {
                    if(isMatch)
                    {
                        let token = jwt.sign({username: username}, config.secret, {expiresIn: TOKEN_EXPIRATION_TIME});
                        res.status(200).json({
                            success: true,
                            message: 'AUTHENTICATION SUCCESSFULL',
                            token: token
                        });
                    }
                    else
                    {
                        //console.log("password -> " + password + " user_password -> " + user.user_password);
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
                        res.status(401).json({
                            success: false,
                            message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                        });
                    }
                })
            });
        }
        else
        {
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
