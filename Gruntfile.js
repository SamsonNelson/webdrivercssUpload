// Command 'grunt' runs WebDriverCSS and captures screenshots
// Command 'grunt watch' watches screenshots/fails for changes - then sends a
// timestamped copy to gravyVisualTesting
//
// On Regression test failure:
//		1. copies images to gravyVisualTesting
//		2. Gulp watch then kicks off 'deploy' and 'print' tasks

//////////////////////////////////////////////////////

var fs = require('fs');
var readDir = require('readdir');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webdriver: {
      test: {
        configFile: './wdio.conf.js'
      }
    },

    'selenium_standalone': {
      serverConfig: {
        seleniumVersion: '2.48.2',
        seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
        drivers: {
          chrome: {
            version: '2.20',
            arch: process.arch,
            baseURL: 'http://chromedriver.storage.googleapis.com'
          },
        },
      },
    },

	// 		if: {
	// 		target: {
	// 				// Target-specific file lists and/or options go here.
	// 				files: 'screenshots/fails/*.png',
	// 				options: {
	// 						// execute test function(s)
	// 						test: function(filepath){
	// 								if(failsImages.exists) {
	// 									return true;
	// 								} else {
	// 									return false;
	// 								}
	// 						 },
	// 				},
	// 				//array of tasks to execute if all tests pass
	// 				ifTrue: [ 'copy:main' ],
	//
	// 				//array of tasks to execute if any test fails
	// 				ifFalse: ['taskIfFalse']
	// 		},
	// },

		copy: {
			main1: {
				files: [{
					expand: true,
					src: ['screenshots/**'],
					dest: 'gravyVisualTesting/<%= grunt.template.today("mm-dd-yyyy-h:MMTT") %>',
				}],
			},
			// main2: {
			// 	files: [{
			// 		expand: true,
			// 		flatten: true,
			// 		src: ['screenshots/reference/*.regression.png', 'screenshots/reference/*.baseline.png'],
			// 		dest: '',
			// 		// dest: 'gravyVisualTesting/<%= grunt.template.today("mm-dd-yyyy-h:MMTT") %>',
			// 	}],
			// },
		},

    shell: {
      gulp: {
        command: 'gulp uploadFailedScreenshots'
      }
    },

    watch: {
      scripts: {
        files: ['screenshots/fails', 'screenshots/fails/*'],
        tasks: ['copy:main'],
        options: ['all', 'changed', 'deleted'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-if');
  grunt.loadNpmTasks('grunt-force-task');
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.loadNpmTasks('grunt-selenium-standalone');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-load-tasks');
	grunt.loadNpmTasks('grunt-file-exists');


  grunt.registerTask('w', ['watch']); // run command "grunt watch"

	grunt.registerTask('i', ['if']);

	grunt.registerTask('baseline', // run command "grunt baseline"
		[
			'selenium_standalone:serverConfig:install',
			'force:selenium_standalone:serverConfig:start',
			'force:webdriver',
			'selenium_standalone:serverConfig:stop',
		]);

  grunt.registerTask('default', // run command "grunt"
    [
      'selenium_standalone:serverConfig:install',
      'force:selenium_standalone:serverConfig:start',
      'force:webdriver',
      'selenium_standalone:serverConfig:stop',
			'copy:main1',
			'shell',
    ]);

};
