var mongoose = require('mongoose');
var models = require(process.cwd() + '/models');

var Alarm = mongoose.model('Alarm');

module.exports = {
    get: function (req, res, next){
        var userId = req.userId;
        Alarm.getForUserId(userId, function (err, alarm){
            if(err) res.status(500).end(); next;
            if(alarm && alarm[0]){
                res.send(alarm[0]);
            } else {
                res.status(404).end();
            }
        });
    },
    post: function (req, res, next){
        var userId = req.userId;
        
        Alarm.getForUserId(userId, function (err, alarm){
            if(err) res.status(500).end(); next;
            if(!(alarm && alarm[0])){
                alarm = new Alarm;
            }

            alarm.byUserId = userId;
            alarm.ts = req.body.time;
            alarm.save(function (err){
                if (err) res.status(500).end(); next;
                res.status(200).end(); next();
            });

        });
    }
}