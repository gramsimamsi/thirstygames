//DEBUG=thirstygames_wt/backend:* npm start

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

/***************************************************************
 * router part
 **************************************************************/

let usersRouter = require("./routes/users");
let beverageRouter = require("./routes/beverage");
let eventRouter = require("./routes/event");
let teamRouter = require("./routes/team");
let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let tokenRouter = require('./routes/token');

/***************************************************************
 * mongoDB specific part
 * @type {*|Mongoose}
 **************************************************************/
let mongoose = require("mongoose");

//connection setup -> remove hardcoded credentials *later*
let mongoDB = "mongodb://thirsty_game:Sj18538aNpi9kCEK3T8laF8LmJI7c13g@ds213053.mlab.com:13053/thirsty_game"
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let app = express();


/***************************************************************
 * CORS Configuration
 **************************************************************/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/beverage', beverageRouter);
app.use('/event', eventRouter);
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
  res.render('error');
});

module.exports = app;
