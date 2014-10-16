var v1 = require('./v1');
var audio = require('./audio');

var token_middleware = function (req, res, next){
    if(!req.userId) return res.send({err: 'Token not provided'});
    next();
}

module.exports = function (app){

    app.get('/api/', v1.main.get);
    app.post('/api/register', v1.register.post);
    app.post('/api/login', v1.login.post);
    app.post('/api/connect', token_middleware, v1.connect.post);
    
    app.get('/api/alarm', token_middleware, v1.alarm.get);
    app.post('/api/alarm', token_middleware, v1.alarm.post);

    app.get('/api/plugins', v1.plugins.list);
    app.get('/api/plugin/:id/:route*', v1.plugins.serve);
    app.get('/api/plugins/installed', token_middleware, v1.plugins.getInstalled);
    app.post('/api/plugins/installed', token_middleware, v1.plugins.setInstalled);

    app.get('/client/setup', audio.setup);
    app.get('/client/shutup/:id', audio.shutup);
    app.get('/client/erase/:id', audio.erase);
    app.get('/client/stream/:id', audio.stream);

    return app;
}