var express = require('express'),
    app = express();

var injectDependencies = require('./injector');
var apiRouter = require('./router');

app = injectDependencies(app);
app = apiRouter(app);

module.exports = exports = app;