#! /usr/bin/env node

//console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
let userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

let async = require('async');
let Team = require('./models/teamModel');
let User = require('./models/userModel');
let Beverage = require('./models/beverageModel');


let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = [];
let teams = [];
let beverages = [];

function userCreate(user_name, user_password, user_id, cb) {
    userdetail = {
        user_name:user_name,
        user_password: user_password,
        user_role:user_role
    }

    let user = new User(userdetail);

    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    });
}

function teamCreate(team_name, team_alc_count, cb) {
    teamdetail = {
        team_name:team_name,
        team_alc_count: team_alc_count
    }
1
    let team = new Team(teamdetail);

    team.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Team: ' + team);
        teams.push(team)
        cb(null, team)
    }  );
}

function beverageCreate(beverage_name, beverage_alc, cb) {
    beveragedetail = {
        beverage_name:beverage_name,
        beverage_alc:beverage_alc
    }

    let beverage = new Beverage(beveragedetail);

    beverage.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Beverage: ' + beverage);
        beverages.push(beverage)
        cb(null, beverage)
    }  );
}

function createUsers(cb) {
    async.parallel([
            function(callback) {
                userCreate('admin', '$2b$10$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy', 0,  callback);
            }
        ],
        // optional callback
        cb);
}

function createBeverages(cb) {
    async.parallel([
            function(callback) {
                beverageCreate('Bier', 5.0, callback);
            },
            function(callback) {
                beverageCreate('Schnaps', 40.0, callback);
            },
            function(callback) {
                beverageCreate('Pfeffi', 18.0, callback);
            }
        ],
        // Optional callback
        cb);
}

async.series([
        createUsers,
        createBeverages
    ], (err) => {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {

        }
        mongoose.connection.close();
    });




