// Load required models
var User = require('../models/user');
var Course = require('../models/course');

var courses = {

  getAll: function(req, res) {
    var users = User.findOne({ email: req.params.email })
                    .populate('courses')
                    .exec(
      function(err, users){
        if (err) res.json({ message: 'No users'});
        res.json(users);
      })
  },
/*
  getOne: function(req, res) {
    var email = req.params.email;
    User.find({ 'email': email },function(err, user){
      if (err)
        res.send(err);

      res.json({ user: user });
    })
  },
*/
  create: function(req, res) {
    User.findOne({ email: req.params.email }).exec(function(err, user) {
      var course = new Course({
        pathCourse: req.body.path,
        time : req.body.time,
        created_by: user._id
      });

      course.save(function(err, course){
          var conditions = { _id: course.created_by },
              update = { courses: { _id: course._id } },
              options = { multi: false };
            
          User.update(conditions, { $push: update }, options, function(err, numAffected){
                      console.log(err);
              if(err)
                res.json({ message: 'Erreur d\'authentification'});
            res.json({ message: 'Course and location start added'}) 
          });

      });

    });
  }

};

module.exports = courses;
