var express = require('express');
var request = require('request');
var routes = require('./routes');
var user = require('./routes/user');
var userInfo = require('./routes/userInfo');
var userSearch = require('./routes/userSearch');
var mediaSearch = require('./routes/mediaSearch');
var popular = require('./routes/popular');
var tag = require('./routes/tag');
var map = require('./routes/map');
var jsonRes = require('./routes/jsonRes');
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
//app.use(express.bodyParser());
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/userSearch', userSearch.userSearch(instagram));

app.get('/userInfo', userInfo.userInfo(instagram));
app.post('/mediaSearch', mediaSearch.mediaSearch(instagram, request));

app.get('/mediaSearch', mediaSearch.mediaSearch(instagram, request));

app.get('/jsonRes/:city', jsonRes.jsonRes(instagram, request));

app.get('/popular', popular.popular(instagram));

app.get('/tag/:tag', tag.tag(instagram));
/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
// Chargement du fichier index.html affiché au client
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
/*
// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});*/