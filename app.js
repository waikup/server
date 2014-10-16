var http = require('http');
var net = require('net');
var mongoose = require('mongoose');
var async = require('async');

global.env = (process.env.NODE_ENV || 'development');
global.config = require('./config/' + env);

mongoose.connect(config.db.url);

var api = require('./api');
var audio = require('./api/audio');

var models = require('./models'); // Loads all models

var httpServer = http.createServer(api);
httpServer.listen(config.http.port);