var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// HANDLED Mongoose AND Models
var mongoose   = require('mongoose');
mongoose.connect('mongodb://coach:coach@ds063630.mongolab.com:63630/coachapi'); // connect to our database

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
  
app.all('/api/*', [require('./middlewares/validateRequest')]);

app.all('/api/user/:email', [require('./middlewares/validateSimilarToken')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log("uoooooooooooooooo");
server.listen(app.get('port'), ipaddress, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

io.on('connection', function (socket) {
  console.log("connection activated");
  socket.on('updateConversation', function(){
    console.log()
    io.sockets.emit('getNewMessages');
  });
});