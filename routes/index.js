var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var user = require('./users.js');
var course = require('./courses.js');
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/api/user', user.create);

/*
 * Routes that can be accessed only by authenticated 
 */
router.get('/api/users', user.getAll);

/*
 * Routes that can be accessed only by authenticated and same token
 */
router.get('/api/user/:email', user.getOne);
router.put('/api/user/:email', user.update);
router.delete('/api/user/:email', user.delete);

	/*
	 * Routes for courses's user
	 */
	router.get('/api/user/:email/courses', course.getAll);
	router.post('/api/user/:email/course', course.create);

module.exports = router;
