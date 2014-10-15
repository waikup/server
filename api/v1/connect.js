var redis = require('redis').createClient();
var mongoose = require('mongoose');
var Alarm = mongoose.model('Alarm');

module.exports = {
    post: function (req, res, next){
        var ma = req.body.major,
            mi = req.body.minor;

        if(!(mi && ma)) return res.send({err: 'Bad arguments'});

        redis.get('id:'+ma+'-'+minor, function (err, uuid){
            if (err) return res.send({err: 'Internal error'});
            if (!uuid) return res.send({err: 'Device not found'});
            var alarm = Alarm.getForUserId(req.userId);
            if(alarm){
                alarm.enable();
                res.send({success: true, connected_to: uuid});
            } else {
                res.send({err: 'No alarm set'});
            }
        });
    }
}