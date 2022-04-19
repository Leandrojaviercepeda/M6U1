var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var hbs = require('hbs');
var { v4: genuuid} = require('uuid');
require('dotenv').config();

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var homeRouter = require('./routes/home');
var contactoRouter = require('./routes/contacto');
var nosotrosRouter = require('./routes/nosotros');
var novedadesRouter = require('./routes/novedades');
var serviciosRouter = require('./routes/servicios');

var app = express();
const uuidGenerated = genuuid();

app.use(session({
  secret: uuidGenerated,
  resave: false,
  saveUninitialized: true,
}));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(uuidGenerated));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/home', homeRouter);
app.use('/contacto', contactoRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/novedades', novedadesRouter);
app.use('/servicios', serviciosRouter);

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
