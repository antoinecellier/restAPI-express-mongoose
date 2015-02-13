var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Conversation = require('../models/conversation');

var ConversationSchema = new mongoose.Schema({
    messages: [{     
    	message: { 
	      type: String, 
	      required: true
	    }, 
	    user: { 
	      type: Schema.Types.ObjectId, 
          ref: 'User'
	    },
	    required: false
    }],
	userA      :  {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
	userB      :  {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Conversation', ConversationSchema);