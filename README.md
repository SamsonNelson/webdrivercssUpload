# WebdriverCSS with grunt demo project

## Setup

1. Install  GraphicsMagick https://github.com/webdriverio/webdrivercss/blob/master/README.md#install
2. git clone this project.
3. Run `npm install` from project root.
4. Run `grunt test` from project root.

The tests should run and create screenshots in the images folder now.
# grunt-webdrivercss-example

===================================================================================================

1. In three terminal windows run commands
 ..* gulp watch
 ..* grunt watch
 ..* grunt

The Gulpfile.js is responsible for

"gulp watch"
watches the gravyVisualTesting/* for anything changes to the files located there
when files have changed - runs the deploy and print tasks

The Gruntfile.js is responsible for

"grunt watch"
watches for changes in the /screenshots/fails/* folder
copies both the fails & reference folders - timestamps them - and copies them to the gravyVisualTesting folder

"grunt"
Runs WebDriverCSS
Takes screenshots and saves them to /screenshots/ reference & fails
