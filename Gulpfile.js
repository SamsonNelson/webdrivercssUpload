// FTP Image Upload / watch on gravyVisualTesting
//
// run command 'gulp watch' to execute gulp tasks
// run command 'cleanDir' to delete all files in gravyVisualTesting

////////////////////////////////////////////////////////////////

var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var fs = require('fs');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var print = require('gulp-print');
var notify = require("gulp-notify");
var newer = require('gulp-newer');
var clean = require('gulp-clean');
var filter = require('gulp-filter');
var gulpmatch = require('gulp-match');
var map = require('map-stream');



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

  var globs = [
    'gravyVisualTesting/**/**/**/*'
  ];

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
// Gulp Task that watches for file changes in the gravyVisualTesting/
// and then starts tasks 'deploy' then 'print'
gulp.task('watch', function() {
  watch('gravyVisualTesting/', batch(function(events, done) {
    gulp.start('deploy', 'print', done);
  }));
});

//////////////////////////////////////////////////////////////////////////////
// Gulp task that deletes all folder in the gravyVisualTesting folder
// This task is not part of the regular flow and has to be initialized using
// 'gulp cleanDir'

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

gulp.task('fileExist', function() {
    fs.stat('screenshots/fails/examplepage.body.1024px.diff.png', function(err, stats) {
      if(err == null) {
          return console.log('Visual Testing FAILED'),
          gulp.start('uploadFailedScreenshots')
        }
          gulp.start('cleanDir'),
        // console.log(),
        console.log("\nVisual Testing PASSED\n")
    });
});
