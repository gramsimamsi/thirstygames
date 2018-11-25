#! /usr/bin/env node

//console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
let userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

let async = require('async')
let Team = require('./models/teamModel')
let User = require('./models/userModel')
let Beverage = require('./models/beverageModel')
let Event = require('./models/eventModel')


let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = [];
let teams = [];
let beverages = [];
let events = [];

function userCreate(user_name, user_password, user_role, user_id, cb) {
    userdetail = {
        user_name:user_name,
        user_password: user_password,
        user_role:user_role,
        user_id: user_id
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
    }  );
}

function teamCreate(team_name, team_member_count, team_logo, team_alc_count, team_id, cb) {
    teamdetail = {
        team_name:team_name,
        team_logo:team_logo,
        team_member_count:team_member_count,
        team_alc_count: team_alc_count,
        team_id: team_id
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

function beverageCreate(beverage_name, beverage_alc, beverage_id, cb) {
    beveragedetail = {
        beverage_name:beverage_name,
        beverage_alc:beverage_alc,
        beverage_id: beverage_id
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

function eventCreate(event_name, event_date, event_logo, event_id, cb) {
    eventdetail = {
        event_name:event_name,
        event_date:event_date,
        event_logo:event_logo,
        event_id: event_id
    }

    let event = new Event(eventdetail);

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
                userCreate('Chris', 'fajsaijiejfakjau39uf8aiu', 0, 'user_0',  callback);
            },
            function(callback) {
                userCreate('Tom', 'öeifieooijiajsfjfjaifjl', 1,'user_1', callback);
            },
            function(callback) {
                userCreate('Michi', 'aklsjieofajfsahfuifhkja', 1,'user_2', callback);
            },
            function(callback) {
                userCreate('Anna', 'lakjfijfljfioajöflkjöai', 1,'user_3', callback);
            },
            function(callback) {
                userCreate( 'Lukas', 'aöjefijesfölajöfojalgjäg', 2, 'user_4', callback);
            }
        ],
        // optional callback
        cb);
}


function createTeams(cb) {
    async.parallel([
            function(callback) {
                teamCreate( 'INF', 666, 'inf_logo.png', 123456.99, 'team_0', callback);
            },
            function(callback) {
                teamCreate('WIF', 69, 'wif_logo.jpg', 5.0, 'team_1', callback);
            }
        ],
        // optional callback
        cb);
}


function createBeverages(cb) {
    async.parallel([
            function(callback) {
                beverageCreate('Bier', 5.0, 'beverage_0', callback);
            },
            function(callback) {
                beverageCreate('Pfeffi', 18.0, 'beverage_1', callback);
            },
            function(callback) {
                beverageCreate('Weinschorle', 8.0, 'beverage_2',  callback);
            }
        ],
        // Optional callback
        cb);
}

function createEvent(cb) {
    async.parallel([
            function(callback) {
                eventCreate('WINF-Barabend', '2018-10-18', 'barabend.png', 'event_0', callback);
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




