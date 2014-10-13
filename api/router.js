var v1 = require('./v1');
var audio = require('./audio');

module.exports = function (app){
    
    // app.get('/api/', v1.main.get);
    // app.post('/api/register', v1.register.post);
    // app.post('/api/login', v1.login.post);

    app.get('/client/setup', audio.setup);
    app.get('/client/shutup/:id', audio.shutup);
    app.get('/client/stream/:id', audio.addStream);

    return app;
}