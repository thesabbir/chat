var express = require('express'),
    http = require('http'),
    path = require('path'),
    hbs = require('express3-handlebars').create({ extname: '.hbs'}),
    app = express();

// all environments
app.locals.title = 'Chat';
hbs.loadPartials();
app.set('port', 8800);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.compress());
app.use(express.logger('dev'));
app.use(express.cookieParser("oi#$%^*Uo98hIoBcxTuih900^%&H"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/views/assets'));
app.use(express.static(path.join(__dirname, 'views/assets')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    console.info("In developement mode");
}

require('./routes')(app);

var server = http.createServer(app);

require('./socket')(server);

server.listen(app.get('port'), function () {
    console.log('Server started at ' + app.get('port'));
});