// Main dependencies and plugins
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('demon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
});

// Default Task
gulp.task('run', ['demon']);