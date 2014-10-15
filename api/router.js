var v1 = require('./v1');
var audio = require('./audio');

module.exports = function (app){
    
    app.get('/api/', v1.main.get);
    app.post('/api/register', v1.register.post);
    app.post('/api/login', v1.login.post);
    app.post('/api/connect', v1.connect.post);
    
    app.get('/api/alarm', v1.alarm.get);
    app.post('/api/alarm', v1.alarm.post);

    app.get('/client/setup', audio.setup);
    app.get('/client/shutup/:id', audio.shutup);
    app.get('/client/erase/:id', audio.erase);
    app.get('/client/stream/:id', audio.addStream);

    return app;
}