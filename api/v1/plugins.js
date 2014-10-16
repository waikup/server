var async = require('async');
var fs = require('fs');
var mongoose = require('mongoose');

var plugins_path = process.cwd() + '/plugins/';

var Alarm = mongoose.model('Alarm');

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
        res.sendFile(r);
    },
    setInstalled: function (req, res, next) {
        var id = req.params.id;
        console.log(id);
        Alarm.getForUserId(req.userId, function (err, alarm){
            if(alarm){
                alarm.fromUser = req.userId;
                alarm.plugins = req.body.plugins;
                alarm.save();
                res.send({success: true});
            } else {
                var alarm = new Alarm();
                alarm.fromUser = req.userId;
                alarm.plugins = req.body.plugins;
                alarm.save();
                res.send({success: true});
            }
        });

    },
    getInstalled: function (req, res, next) {
        var id = req.params.id;
        Alarm.getForUserId(req.userId, function (err, alarm){
            if(alarm){
                res.send(alarm.plugins || {});
            } else {
                res.send({err: 'No alarm set for this user '});
            }
        });
    }
}