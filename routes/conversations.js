// Load required models
var User = require('../models/user');
var Conversation = require('../models/conversation');

var conversations = {

  getOne: function(req, res) {
    var userA = req.params.userA;
    var userB = req.params.userB;

    Conversation.findOne([
                    { $or: [{userA: userA}, {userB: userB}] },
                    { $or: [{userB: userA}, {userA: userB}] }
                ])
                .populate('messages.user')
                .exec(function (err, conversation) {
                  if (err){
                    res.json(err);
                  }else{
                    res.json(conversation);
                  }                     
                });
  },

  // getOneById: function(req, res) {
  //   var id = req.params.id;
  //   User.findOne({ '_id': id },function(err, user){
  //     if (err)
  //       res.send(err);

  //     res.json({ user: user });
  //   })
  // },

  create: function(req, res) {
    var conversation = new Conversation({
      userA: req.body.userA,
      userB: req.body.userB
    });

    conversation.save(function(err, conversation) {
      if (err)
        res.send(err);

        res.json(conversation);
    });
  },

  exist: function(req, res) {
    var userA = req.body.userA;
    var userB = req.body.userB;

    Conversation.find([
                    { $or: [{userA: userA}, {userB: userB}] },
                    { $or: [{userB: userA}, {userA: userB}] }
                ])
                .exec(function (err, results) {
                  if (err){
                    res.json({exist: false});
                  }else{
                    res.json(results);
                  }                     
                });
  },
  update: function(req, res) {
    var userA = req.body.userA;
    var userB = req.body.userB;
    var messagePush = {
                        message: req.body.message,
                        user: req.body.userTransmitter  
                      };

    var conditions = { _id: req.params.idConv },
        update = { messages: messagePush },
        options = { multi: false };
            
    Conversation.update(conditions, { $push: update }, options, function(err, numAffected){
        if(err)
          res.json({ message: 'Erreur d\'authentification'});
      res.json({ message: 'Message added to conversation'}) 
    });
  }

  // delete: function(req, res) {
  //   User.remove({ email: req.params.email }, function( err ){
  //     if( err ) res.json({ message: 'Impossible to delete'}); 
  //     res.json({ message: 'User deleted'});
  //   });
  // }
};

module.exports = conversations;