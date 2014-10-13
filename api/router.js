var v1 = require('./v1');
module.exports = function (app){
    app.get('*', v1.main.get);
    return app;
}