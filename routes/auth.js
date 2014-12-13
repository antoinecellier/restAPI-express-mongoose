// Load required models
var User = require('../models/user');
var jwt = require('jwt-simple');

var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials 1"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    auth.validate(username, password, function(user){

        if (!user) { // If authentication fails, we send a 401 back
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials 2"
          });
          return;
        }

        if (user) {

          // We will generate a token
          var userToken = genToken(user);
          // Update user ( add token )
          var conditions = { email: userToken.user.email },
              update = userToken.token,
              options = { multi: false };
          User.update(conditions, { $set: { token: update} }, options, 
              function(err, numAffected){
                if(err)
                  res.json({ message: 'Erreur d\'authentification'});
                console.log(numAffected);
          });
          userToken.user.token = userToken.token;
          res.json(userToken);
        }
    });


  },

  validate: function(username, password, callback) {

    User.findOne({ 'email': username}, function(err, user){
      if(err || user == null)
        return callback(err);

      user.verifyPassword(password, function ( err, result ){
        console.log(err);
        if(err)
          return callback(err);
        if(!result)
          return callback(null);

        return callback(user);
      });
    });
  },
  validateUser: function(token) {
    var user = User.find({ 'token': token }, function(err, user){
      return user;
    });
    return user;
  }
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
