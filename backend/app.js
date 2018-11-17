//DEBUG=thirstygames_wt/backend:* npm start

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/***************************************************************
 * controller part
 **************************************************************/

let usersRouter = require("./routes/users");


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



var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

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
