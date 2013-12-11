# This is the savefiles API #
This is a simple and rudimentary API for managing a directory of files.
Now it only accepts jpg for the upload.

The thumbnailer uses the [thumbnail](https://npmjs.org/package/thumbnail) package which relies on the [GraphicsMagick](http://www.graphicsmagick.org) Image Processing System. GraphicsMagick is available for virtually any Unix or Unix-like system, including Linux. It also runs under Windows 2000 and later (Windows 2000, XP, Vista, and 7), and MacOS-X.

## Installation ##
- Clone git repo
- run npm install
- create uploadDir @ __dirname + '/tmp'
- create imageDir @ __dirname + '/public/images'
- create thumbDir @ __dirname + '/public/images/thumbs'
- start (default port 9090)
- goto url: http://localhost:9090/upload.html
- upload a couple of jpg files
- goto url: http://localhost:9090/files.html
- profit!

If all goes well you can return to your freshly uploaded list by returning to the upload.html and remove the files from the list. this will also remove the files from disk.

## TODO's ##
- Make file type configurable
- Allow multiple file types
- Also remove the thumbnails from disk
- implement the 'edit-buttons' in the Kendo ListView
- yada-yada
- pff..


