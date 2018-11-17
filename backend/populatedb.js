#! /usr/bin/env node

//console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Team = require('./models/teamModel')
var User = require('./models/userModel')
var Beverage = require('./models/beverageModel')
var Event = require('./models/eventModel')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var teams = []
var beverages = []
var events = []

function userCreate(user_id, user_name, user_password, user_role, cb) {
    userdetail = {
        user_id: user_id,
        user_name:user_name,
        user_password: user_password,
        user_role:user_role
    }

    var user = new User(userdetail);

    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    }  );
}

function teamCreate(team_id, team_name, team_member_count, team_logo, team_alc_count, cb) {
    teamdetail = {
        team_id: team_id,
        team_name:team_name,
        team_logo:team_logo,
        team_member_count:team_member_count,
        team_alc_count: team_alc_count
    }
1
    var team = new Team(teamdetail);

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

function beverageCreate(beverage_id, beverage_name, beverage_alc, cb) {
    beveragedetail = {
        beverage_id: beverage_id,
        beverage_name:beverage_name,
        beverage_alc:beverage_alc
    }

    var beverage = new Beverage(beveragedetail);

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

function eventCreate(event_id, event_name, event_date, event_logo, cb) {
    eventdetail = {
        event_id: event_id,
        event_name:event_name,
        event_date:event_date,
        event_logo:event_logo
    }

    var event = new Event(eventdetail);

    event.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Event: ' + event);
        events.push(event)
        cb(null, event)
    }  );
}

function createUsers(cb) {
    async.parallel([
            function(callback) {
                userCreate('user_0', 'Chris', 'fajsaijiejfakjau39uf8aiu', 0, callback);
            },
            function(callback) {
                userCreate('user_1', 'Tom', 'öeifieooijiajsfjfjaifjl', 1, callback);
            },
            function(callback) {
                userCreate('user_2', 'Michi', 'aklsjieofajfsahfuifhkja', 1, callback);
            },
            function(callback) {
                userCreate('user_3', 'Anna', 'lakjfijfljfioajöflkjöai', 1, callback);
            },
            function(callback) {
                userCreate('user_4', 'Lukas', 'aöjefijesfölajöfojalgjäg', 2, callback);
            }
        ],
        // optional callback
        cb);
}


function createTeams(cb) {
    async.parallel([
            function(callback) {
                teamCreate('team_0', 'INF', 666, 'inf_logo.png', 123456.99, callback);
            },
            function(callback) {
                teamCreate('team_1', 'WIF', 69, 'wif_logo.jpg', 5.0, callback);
            }
        ],
        // optional callback
        cb);
}


function createBeverages(cb) {
    async.parallel([
            function(callback) {
                beverageCreate('beverage_0', 'Bier', 5.0, callback);
            },
            function(callback) {
                beverageCreate('beverage_1', 'Pfeffi', 18.0, callback);
            },
            function(callback) {
                beverageCreate('beverage_2', 'Weinschorle', 8.0, callback);
            }
        ],
        // Optional callback
        cb);
}

function createEvent(cb) {
    async.parallel([
            function(callback) {
                eventCreate('event_0', 'WINF-Barabend', '2018-10-18', 'barabend.png', callback);
            }
        ],
        // Optional callback
        cb);
}

async.series([
        createUsers,
        createTeams,
        createBeverages,
        createEvent
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            //console.log('BOOKInstances: '+bookinstances);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });




