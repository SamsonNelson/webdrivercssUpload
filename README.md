# WebdriverCSS with grunt demo project

## Setup

1. Install  GraphicsMagick https://github.com/webdriverio/webdrivercss/blob/master/README.md#install
2. git clone this project.
3. Run `npm install` from project root.
4. Run `grunt test` from project root.

The tests should run and create screenshots in the images folder now.
# grunt-webdrivercss-example

===================================================================================================

### * In three terminal windows run commands
 1. gulp watch  
 2. grunt watch  
 3. grunt  

#### The Gulpfile.js is responsible for

"gulp watch"  
 1. watches the gravyVisualTesting/* for anything changes to the files located there  
 2. when files have changed - runs the deploy and print tasks  

#### The Gruntfile.js is responsible for

"grunt watch"
 1. watches for changes in the /screenshots/fails/* folder  
 2. copies both the fails & reference folders - timestamps them - and copies them to the gravyVisualTesting folder  

"grunt"
 1. Runs WebDriverCSS  
 2. Takes screenshots and saves them to /screenshots/ reference & fails  
