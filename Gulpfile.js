// Grunt runs command 'fileExists' which checks to see if there is
// an Image in the screenshots/fails/*
// If there is, it deploys to the FTP Server
// And prints out the URL

////////////////////////////////////////////////////////////////

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var fs = require('fs');
var watch = require('gulp-watch');
var print = require('gulp-print');
var notify = require("gulp-notify");
var newer = require('gulp-newer');
var clean = require('gulp-clean');

/////////////////////////////////////////////////////////////////////////////
// initialized in Gruntfile.js with shell command "uploadFailedScreenshots"
gulp.task('uploadFailedScreenshots', ['deploy', 'print'], function(){
    gulp.start('cleanDir')
});

//////////////////////////////////////////////////////////////////////////////
// Gulp Task for deploying timestamped images from gravyVisualTesting/ to Server
gulp.task('deploy', function() {

  var conn = ftp.create({
    host: '10.200.200.18',
    user: 'dev_build',
    password: 'ccsB@$$',
    parallel: 10,
    log: gutil.log
  });

  var globs = ['gravyVisualTesting/**/**/**/*'];

  return gulp.src(globs, {base: 'gravyVisualTesting', buffer: false })
      .pipe(conn.newer('gravyVisualTesting')) // only uploads newer files
      .pipe(conn.dest('gravyVisualTesting'))
  });

//////////////////////////////////////////////////////////////////////////////
// Gulp Task that once files are deployed - Prints out URL
gulp.task('print', ['deploy'], function() {

  gulp.src('gravyVisualTesting/*')

    .pipe(notify({
      message: '\n\n|| Regression Image URL is Below ||'
    }))

    .pipe(print(function(filepath) {
      return "http://build-dev.mshare.net/" + filepath + '\n';
    }))
});

//////////////////////////////////////////////////////////////////////////////
// Gulp task that deletes all folder in the gravyVisualTesting folder and
// 'screenshots/fails/*' after task 'deploy' and 'print' are run

gulp.task('cleanDir', function() {

  var globs = [
    'gravyVisualTesting/*',
    'screenshots/fails/*'
  ]

  return gulp.src(globs, {
      read: false
    })

    .pipe(clean());
});

//////////////////////////////////////////////////////////////////////////////
// Initialized by grunt who runs shell command 'fileExists'
gulp.task('fileExists', function() {

    fs.stat('screenshots/fails/examplepage.body.1024px.diff.png', function(err, stats) {

      if(err == null) {
          return console.log('Visual Testing FAILED'),
          gulp.start('uploadFailedScreenshots')
        }

          gulp.start('cleanDir'),
          console.log("\nVisual Testing PASSED\n")
    });
});
