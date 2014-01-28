var express = require('express');
var request = require('request');
var routes = require('./routes');
var user = require('./routes/user');
var userInfo = require('./routes/userInfo');
var userSearch = require('./routes/userSearch');
var mediaSearch = require('./routes/mediaSearch');
var map = require('./routes/map');
var http = require('http');
var path = require('path');
var instagram = require('instagram-node-lib');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
instagram.set('client_id', '37d0112394ed47e98f40dbc7e556c6b1');
instagram.set('client_secret', 'b793eeb24e5345fd8609ceb77a17bbd2');
instagram.set('redirect_uri', 'http://localhost:3000/');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/userSearch', userSearch.userSearch(instagram));

app.get('/userInfo', userInfo.userInfo(instagram));

app.get('/mediaSearch/:city', mediaSearch.mediaSearch(instagram, request));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});