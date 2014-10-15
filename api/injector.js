var bodyparser = require('body-parser'),
    cors = require('cors'),
    cookieparser = require('cookie-parser'),
    express = require('express'),
    morgan = require('morgan'),
    multipart = require('connect-multiparty');

module.exports = function (app){
    // Configure App
    app.set('x-powered-by', false);
    app.set('view engine', 'ejs');

    // Set middlewares
    app.use(express.static(__dirname + '/public'));
    app.use(cors());
    app.use(function (req, res, next){
        if(!(req.headers && req.headers['x-user-token'])) return next();
        req.userId = req.headers['x-user-token'];
        next();
    });

    if(env == 'development'){
        app.use(morgan('dev'));
    }

    app.use(bodyparser.json()); // Multipart supports it.
    app.use(cookieparser());
    app.use(multipart());
    app.use(bodyparser.urlencoded({extended: false}))

    return app;
}