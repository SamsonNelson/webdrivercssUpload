// Run command 'grunt baseline' for inital images
// Run command 'grunt' for regression tests

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

    selenium_standalone: {
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
        }],
      },
    },

    shell: {
      gulp: {
        command: 'gulp fileExists'
      }
    },

    clean: ['screenshots/fails'],

  });

  grunt.loadNpmTasks('grunt-force-task');
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.loadNpmTasks('grunt-selenium-standalone');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

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
      'copy:main',
      'shell',
    ]);

};
