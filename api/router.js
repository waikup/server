var v1 = require('./v1');
var audio = require('./audio');

module.exports = function (app){
    
    app.get('/api/', v1.main.get);
    app.post('/api/register', v1.main.get);
    app.post('/api/login', v1.main.get);
    app.get('/api/', v1.main.get);
    app.get('/api/', v1.main.get);
    app.get('/api/', v1.main.get);
    app.get('/api/', v1.main.get);
    app.get('/api/', v1.main.get);

    app.get('/stream/:id', audio.addStream);
    app.get('/client/shutup', v1.main.get);
    app.get('/client/setup', v1.main.get);

    return app;
}