var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var mongo = require('mongodb');
var mongoose = require('mongoose');
var monk = require('monk');
var db = monk('localhost:27017/programmers-factory');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(function(req,res,next){
    req.db = db;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.session({secret: "derpy"}));

//app.use(passport.initialize());
//app.use(passport.session());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
/*
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.loadOne({ email: email }).then(function(user) {
            if (!user || !user.authenticate(password)) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            done(null, user);
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.loadOne({ _id: id }).then(function(user) {
        done(null, user);
    }).catch(function(err) {
        done(err, null);
    });
});
*/
module.exports = app;
