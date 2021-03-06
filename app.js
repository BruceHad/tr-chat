var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var bodyParser = require('body-parser');
var model = require('./models/model');

var index = require('./routes/index');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var validator = require('validator');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/index', index);

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


io.on('connection', function(socket){
  // console.log('Connection 1', socket.id, socket.request.headers.referer);
  var roomId = socket.request.headers.referer.split('/')[3];
  var ck = socket.request.headers.cookie;
  var userId = cookie.parse(ck).userId;
  console.log('userId connected', userId);
  
  
  if(roomId && userId){
    if(!model.inRoom(roomId, userId)){
      // console.log('Add ', userId, ' to room ', roomId);
      model.joinRoom(roomId, userId);
    }
    io.emit('join', {
      "room": model.getRoom(roomId),
      "user": model.getUser(userId)
    });
  } 
  
  socket.on('chat message', function(msg) {
    var userName = model.getUser(userId).name;
    io.emit('chat message', validator.trim(validator.escape(msg)), userName);
  });
  
  // socket.on('update username', function(user){
  //   console.log(user);
  // });
  
  
});

var port = 8080;
http.listen(process.env.PORT || 8080, function() {
  console.log('listening on *:', this.address().port, app.settings.env);
});

module.exports = app;
