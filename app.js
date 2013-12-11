/**
 * Module dependencies.
 */

var express = require('express')
  , upload = require('./routes/upload')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//this is a supercool logger function
var logger = function(req, res, next) {
    console.log("GOT REQUEST !", req);
    next(); // Passing the request to the next handler in the stack.
}

// all environments
app.set('port', process.env.PORT || 9090);
app.set('views', __dirname + '/views');
app.set('view engine', 'mustache');
app.engine('mustache', require('hogan-middleware').__express);
app.use(express.favicon());
//use the supercool logger function
// app.use(logger);
app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.bodyParser({uploadDir:__dirname + '/tmp'}));
app.use(express.methodOverride());
app.use(express.cookieParser('fd3e7a04f1a36519fe5c56782f87596c'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/index', upload.index);
app.post('/save', upload.save);
app.post('/remove', upload.remove);
app.get('/destroy', upload.destroy);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
