var mongoose     = require('mongoose');
var bcrypt       = require('bcrypt-nodejs');
var Schema       = mongoose.Schema;

var Course = require('../models/course');

var UserSchema = new mongoose.Schema({
        email        : {
          type: String,
          unique: true,
          required: true
        },
        password     : {
          type: String,
          required: true
        },
        lastName     : {
            type: String,
            required: true
        },
        firstName    : {
            type: String,
            required: true
        },
        sex         :{
            type: String
        },
        bornDate    : {
            type: Date,
        },
        
        courses      : [ 
          {
            type: Schema.Types.ObjectId, 
            ref: 'Course'
          }
         ],

        createdAt    : {
            type: Date,
            default: Date.now
        },
        updatedAt    : {
            type: Date,
            default: Date.now
        },
        token: {
            type: String,
            unique: true,
            required: false
        },
});



// Before save hash Password
UserSchema.pre('save', function ( next ) {
  var user = this;

  // Next if the password hasn't changed
  if (!user.isModified('password'))
    return next();

    // Password changed so we need to hash it
    bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) 
      return next(err);

      user.password = hash;
 
      next();
    });

});

UserSchema.methods.verifyPassword = function ( password, cb ) {

  bcrypt.compare(password, this.password, function ( err, result ){
    if(err) 
      return cb(err);

    cb(null, result);
  });

};

module.exports = mongoose.model('User', UserSchema);




