var redis = require('redis').createClient();
var mongoose = require('mongoose');
var Alarm = mongoose.model('Alarm');

var audio = require('./../audio');

module.exports = {
    post: function (req, res, next){
        console.log(req.body);
        var ma = req.body.major,
            mi = req.body.minor;

        if(!(mi && ma)) return res.send({err: 'Bad arguments'});

        redis.get('id:'+ma+'-'+mi, function (err, uuid){
            if (err) return res.send({err: 'Internal error'});
            if (!uuid) return res.send({err: 'Device not found'});
            console.log(ma, mi, 'gay');
            var alarm = Alarm.getForUserId(req.userId);
            if(alarm){
                redis.set('user:radio_connection:'+req.userId, uuid);
                alarm.enable = true;
                alarm.save();
                res.send({success: true, connected_to: uuid});
                var stream = audio.getStream(uuid);
                console.log(stream);
                require('request')('http://uhmp3.com/user-mp3-to/8_wiggle-ft-snoop-dogg-jason-derulo.mp3').pipe(stream);
            } else {
                console.log('gay');
                res.send({err: 'No alarm set'});
            }
        });
    }
}