var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var confirmation = require('./routes/confirmation');
var pizzaJSON = require('./routes/pizzaJSON');
var app = express();

var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost/AndrewC';
mongoose.connect(mongoUrl, function (err) {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
});

//Clean up the connection when cntrl+c is pressed
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log("Closing the mongodb connection");
    process.exit(0);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/confirmation', confirmation);
app.use('/api/pizza', pizzaJSON);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;