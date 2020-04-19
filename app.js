// Import libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');

// Importing routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var complaintsRouter = require('./routes/complaints');
var helpers = require('./common/helpers');

// server initialization.
var app = express();

// view engine setup as handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// initialise cookie sessions.
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}))

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(logger('dev'));//intializing logging
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//checks whether user is logged in
const authChecker = (req, res, next) => {
  if (req.session.loggedin) {
      next();
  } else {
     res.redirect("/");
  }
}

// initialize routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/complaints', authChecker, complaintsRouter);



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
