var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const router = require('./src/routes/mainRouter');
const mongoose = require('mongoose');
var app = express();

// Environment Variables
require('dotenv').config();

mongoose.connect(process.env.MONGOADDRESS, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true }).catch(error=> {
  console.log("Can't Connect to DB");
  console.log(error);
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Main app router
app.use(router);
app.get('/ping',(req,res)=> {
  res.status(200).json({message:"pong"});
})
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
});

module.exports = app;
