# WebdriverCSS with grunt demo project

## Setup

1. Install  GraphicsMagick https://github.com/webdriverio/webdrivercss/blob/master/README.md#install
2. git clone this project.
3. Run `npm install` from project root.
4. Run `grunt test` from project root.

The tests should run and create screenshots in the images folder now.

===================================================================================================

### For basic Jenkins functionality
 1. run command 'grunt' to run tasks:  
  * WebdriverCSS  
  * Copy folder screenshots to gravyVisualTesting with a timestamp  
  * Deploys new files to FTP Server  
  * Prints URL  


#### The Gruntfile.js contains
 1. Selenium WebdriverCSS
 2. Copy files from screenshots to gravyVisualTesting
 3. Watch on screenshots

#### The Gruntfile.js is responsible for
