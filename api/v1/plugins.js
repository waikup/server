var fs = require('fs');
var async = require('async');
var plugins_path = process.cwd() + '/plugins/';

module.exports = {
    list: function (req, res, next) {
        var ids = fs.readdirSync(plugins_path);
        var packet = {};
        async.map(ids, function (id, callback){
            fs.readFile(plugins_path + id + '/package.json', function (err, data){
                if(err) data = "{}"
                packet[id] = JSON.parse(data.toString());
                callback();
            });
        }, function (err){
            res.send(packet);
        });

    },
    serve: function (req, res, next) {
        var r = plugins_path + req.params.id + '/' + req.params.route;
        res.sendfile(r);
    }
}