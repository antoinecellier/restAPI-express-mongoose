var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Course = require('../models/user');

var CourseSchema = new mongoose.Schema({
    pathCourse: [{     
    	latitude: { 
	      type: Number, 
	      required: true
	    }, 
	    longitude: { 
	      type: Number, 
	      required: true 
	    },
	    _id : false 
    }],
    time: {     
    	hours: { 
	      type: Number, 
	      required: true
	    }, 
	    minutes: { 
	      type: Number, 
	      required: true 
	    },
	    seconds: { 
	      type: Number, 
	      required: true 
	    }  
	},
    created_by: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Course', CourseSchema);