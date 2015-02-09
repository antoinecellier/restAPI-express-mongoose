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

  getOne: function(req, res) {
    Course.find({ '_id': req.params.courseId },function(err, course){
      if (err)
        res.send(err);
            
      res.json( course );
    })
  },
  
  create: function(req, res) {
    User.findOne({ email: req.params.email }).exec(function(err, user) {

      console.log(req.body);
      var course = new Course({
        pathCourse: req.body.path,
        time : req.body.time,
        dateTime: req.body.dateTime,
        created_by: user._id
      });

      course.save(function(err, course){
          console.log(err);
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
