var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('./users.js');
var course = require('./courses.js');
var conversation = require('./conversations.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/api/user', user.create);

/*
 * Routes that can be accessed only by authenticated 
 */
router.get('/api/users', user.getAll);
router.get('/api/userById/:id', user.getOneById);

router.post('/api/conversation/', conversation.create);
router.get('/api/conversation/:userA/:userB', conversation.getOne);
router.post('/api/conversation/exist', conversation.exist);
router.put('/api/conversation/:idConv', conversation.update);
/*
 * Routes that can be accessed only by authenticated and same token
 */
router.get('/api/user/:email', user.getOne);
router.put('/api/user/:email', user.update);
router.delete('/api/user/:email', user.delete);

	/*
	 * Routes for courses
	*/
	router.get('/api/courses', course.getCourses); 
	/*
	 * Routes for courses's user
	*/
	router.get('/api/course/:courseId', course.getOne); 
	router.get('/api/user/:email/courses', course.getAll);
	router.post('/api/user/:email/course', course.create);

module.exports = router;
