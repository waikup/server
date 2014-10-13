var http = require('http');

global.config = require('./config/' + (process.env.NODE_ENV || 'development'));

var api = require('./api');

var httpServer = http.createServer(api);

httpServer.listen(config.http.port);