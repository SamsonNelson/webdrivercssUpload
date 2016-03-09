// Command 'grunt' runs WebDriverCSS and captures screenshots
// Command 'grunt watch' watches screenshots/fails for changes - then sends a
// timestamped copy to gravyVisualTesting
//
// On Regression test failure:
//		1. copies images to gravyVisualTesting
//		2. Gulp watch then kicks off 'deploy' and 'print' tasks

//////////////////////////////////////////////////////


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

    copy: {
      main: {
        files: [{
          expand: true,
          src: ['screenshots/**'],
          dest: 'gravyVisualTesting/<%= grunt.template.today("mm-dd-yyyy-h:MMTT") %>',
          filter: 'isFile',
        }, ],
      },
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


  grunt.loadNpmTasks('grunt-force-task');
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.loadNpmTasks('grunt-selenium-standalone');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-load-tasks');

  grunt.registerTask('w', ['watch']); // run command "grunt watch"

  grunt.registerTask('default', // run command "grunt"
    [
      'selenium_standalone:serverConfig:install',
      'force:selenium_standalone:serverConfig:start',
      'force:webdriver',
      'selenium_standalone:serverConfig:stop',
      'copy:main',
      'shell',
    ]);

};
