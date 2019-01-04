//DEBUG=thirstygames_wt/backend:* npm start

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let webSocket = require('ws');
let cors = require('cors');

/***************************************************************
 * router part
 **************************************************************/

let userRouter = require('./routes/user');
let beverageRouter = require('./routes/beverage');
let teamRouter = require('./routes/team');
let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let tokenRouter = require('./routes/token');

/***************************************************************
 * mongoDB specific part
 * @type {*|Mongoose}
 **************************************************************/
let mongoose = require('mongoose');

//connection setup -> remove hardcoded credentials *later*
//ToDo Docker link wieder aktivieren
//let mongoDB = "mongodb://database/thirstyGames";
let mongoDB = "mongodb://thirsty_game:Sj18538aNpi9kCEK3T8laF8LmJI7c13g@ds213053.mlab.com:13053/thirsty_game";
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let app = express();

/***************************************************************
 * CORS Configuration
 **************************************************************/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(cors());

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/beverage', beverageRouter);
app.use('/team', teamRouter);
app.use('/login', loginRouter);
app.use('/token', tokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

/***************************************************************
 * Websocket Configuration
 **************************************************************/

let webSocketServer = new webSocket.Server({port: 8080});

webSocketServer.on('connection', (socket) => {
    socket.on('message', (message) => {
        //ToDo remove
        console.log(`received message: ${message}`);
        //ToDo Schreibe in Datenbank
        //ToDo Hole Daten aus DB
        //Broadcast update an alle Clients
        webSocketServer.clients.forEach((client) => {
            if (client.readyState === webSocket.OPEN) {
                //ToDo sende relevante Daten
                client.send('Hi Angular');
            }
        });
    });
    //ToDo remove
    socket.send('Server is listening');
});

exports.webSocketServer = webSocketServer;
module.exports = app;
