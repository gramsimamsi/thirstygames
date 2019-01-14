// DEBUG=thirstygames_wt/backend:* npm start

const createError = require('http-errors');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

/** *************************************************************
 * router part
 **************************************************************/

const userRouter = require('./routes/user');
const beverageRouter = require('./routes/beverage');
const teamRouterFunction = require('./routes/team');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const tokenRouter = require('./routes/token');

/** *************************************************************
 * mongoDB specific part
 * @type {*|Mongoose}
 **************************************************************/
const mongoose = require('mongoose');

// connection setup -> remove hardcoded credentials *later*
// ToDo Docker link wieder aktivieren
// const mongoDB = 'mongodb://database/thirstyGames';
const mongoDB = 'mongodb://thirsty_game:Sj18538aNpi9kCEK3T8laF8LmJI7c13g@ds213053.mlab.com:13053/thirsty_game';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = (app, websocketServer) => {

  /** *************************************************************
   * CORS Configuration
   * **************************************************************/
  app.use(cors());

  /*
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  */

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/user', userRouter);
  app.use('/beverage', beverageRouter);
  app.use('/team', teamRouterFunction(websocketServer));
  app.use('/login', loginRouter);
  app.use('/token', tokenRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
  });

  return app;
};
