const express = require('express');
const bodyParser = require('body-parser');

let userModel = require('../models/userModel');

let jwt = require('jsonwebtoken');
let config = require('../jwtConfig');
let middleware = require('../middleware');

const TOKEN_EXPIRATION_TIME =  '1h';


class LoginHandler
{
    login(req, res)
    {
        let username = req.params.user_name;
        let password = req.params.user_password;

        console.log(username);
        console.log(password);
        //get User from Database
        userModel.find({user_name: username}).exec(function(err, user)
        {
            if (err)
            {
                //throw err;
                res.send(401).json({
                    success: false,
                    message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                });
            }

            if(username && password)
            {
                // test a matching password
                user.comparePassword(password, function (err, isMatch) {
                    if (err) {
                        //throw err;
                        res.send(401).json({
                            success: false,
                            message: 'AUTHENTICATION FAILED -> WRONG USERNAME OR PASSWORD'
                        });
                    }
                    //generate token
                    let token = jwt.sign({username: username}, config.secret, {expiresIn: TOKEN_EXPIRATION_TIME});
                    res.status(200).json({
                        success: true,
                        message: 'AUTHENTICATION SUCCESSFULL',
                        token: token
                    });
                });
            }
            else
            {
                console.log("Username ->" + username + " Passwort ->" + password);
            }
        });

    }

    index (req, res)
    {
        res.json({
            success: true,
            message: 'INDEX PAGE'
        });
    }
}

module.exports = LoginHandler;
