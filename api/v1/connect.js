var redis = require('redis').createClient();
var mongoose = require('mongoose');
var Alarm = mongoose.model('Alarm');

var audio = require('./../audio');

module.exports = {
    post: function (req, res, next){
        console.log(req.body);
        var ma = req.body.major,
            mi = req.body.minor;
        if(!(mi || ma)) return res.send({err: 'Bad arguments'});

        redis.get('id:'+ma+'-'+mi, function (err, uuid){
            if (err) return res.send({err: 'Internal error'});
            if (!uuid) return res.send({err: 'Device not found'});
            Alarm.getForUserId(req.userId, function (err, alarm){
                if(alarm){
                    redis.set('uuid:user:'+uuid, req.userId);
                    res.send({success: true, connected_to: uuid});
                } else {
                    res.send({err: 'No alarm set'});
                }
            });
        });
    }
}