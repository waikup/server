var mongoose = require('mongoose');
var models = require(process.cwd() + '/models');

var Alarm = mongoose.model('Alarm');

module.exports = {
    enable: function (req, res, next){
        var userId = req.userId;
        Alarm.getForUserId(userId, function (err, alarm){
            if(err) return res.send({err: err});
            if (!req.body.time) return res.send({err: 'No time provided'});
            console.log(alarm);
            if(!alarm) alarm = new Alarm();
            alarm.fromUser = req.userId;
            alarm.enable = true;
            alarm.time = req.body.time;
            alarm.save();
            res.send({success: true});
        });
    },
    disable: function (req, res, next){
        var userId = req.userId;
        Alarm.getForUserId(userId, function (err, alarm){
            if(err) return res.send({err: err});
            if (!alarm) return res.send({err: 'No alarm set'});
            alarm.enable = false;
            alarm.save();
            res.send({success: true});
        });
    },
    getAlarm: function (req, res, next){
        var userId = req.userId;
        Alarm.getForUserId(userId, function (err, alarm){
            if(err) return res.send({err: err});
            res.send(alarm || {});
        });
    }
}