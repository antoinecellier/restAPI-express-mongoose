// Load required models
var User = require('../models/user');
var Course = require('../models/course');

var users = {

  getAll: function(req, res) {
    var users = User.find({}, function(err, users){
      if (err) res.json({ message: 'No users'});
      res.json(users);
    })
    
  },

  getOne: function(req, res) {
    var email = req.params.email;
    User.find({ 'email': email },function(err, user){
      if (err)
        res.send(err);

      res.json({ user: user });
    })
  },

  create: function(req, res) {
    var user = new User({
      email: req.body.email,
      password: req.body.password,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      sex: req.body.sex,
      token: ""
    });

    user.save(function(err) {
      if (err)
        res.send(err);

        res.json('User added');
    });
  },

  update: function(req, res) {
    var conditions = { email: req.params.email },
        update = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          sex: req.body.sex
        },
        options = { multi: false };

    User.update(conditions, { $set: update }, options, 
        function(err, numAffected){
          if(err)
            res.json({ message: 'Erreur d\'authentification'});
        res.json({ message: 'Your informations have been changed'}) 
    });
  },
  delete: function(req, res) {
    User.remove({ email: req.params.email }, function( err ){
      if( err ) res.json({ message: 'Impossible to delete'}); 
      res.json({ message: 'User deleted'});
    });
  }
};

module.exports = users;
