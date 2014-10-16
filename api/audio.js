var redis = require('redis').createClient();
var uuid = require('node-uuid');
var mongoose = require('mongoose');

var Alarm = mongoose.model('Alarm');

var timeGen = function (){
    var t = new Date;
    var m = t.getMinutes(),
        h = t.getHours()
    return h + '' + m;
}

var running_alarm_step = {};

var playPluginWithId = function (id, attr, stream, cb){
    try {
        var p = require(process.cwd() + '/plugins/' + id + '/index.js');
        p(stream, attr, cb);

    } catch (e){
        return res.send('FAILERINO');
        cb(e);
    }
}

module.exports = {
    stream: function (req, res, next){
        var id = req.params.id;
        Alarm.getAlarmByUuid(id, function (err, alarm){
            if(err) return res.send(500);
            if(!alarm) return res.send(404);
            console.log(alarm);
            if(running_alarm_step[uuid]){
                console.log(running_alarm_step[uuid]);
                running_alarm_step[uuid] += 1;
                var to_run = Object.keys(alarm.plugins)[running_alarm_step];
                var attr = alarm.plugins[to_run];

                playPluginWithId(to_run, attr, res, function (err){
                    console.log(err, 'Pluging finished playing');
                });

            }

            if (alarm.enable && alarm.time && (alarm.time == timeGen())){
                
                console.log('Starting alarm');

                var to_run = Object.keys(alarm.plugins)[0];
                var attr = alarm[to_run];
                playPluginWithId(to_run, attr, res, function (err){
                    console.log(err, 'Pluging finished playing');
                });

                running_alarm_step[uuid] = 1;
            }

        });

    },
    setup: function (req, res, next){

        redis.incr('client_counter', function (err, count){

            var id = uuid.v1();
            var major = parseInt(count / 65536, 10);
            var minor = parseInt(count % 65536);

            var stringId = 'id:'+major+'-'+minor;

            redis.set(stringId, id);
            redis.set('uuid:'+id, major+'-'+minor);

            res.send({
                minor: minor,
                major: major,
                client_id: id,
                stream_url: '/stream/' + id
            });

        });
    },
    shutup: function (req, res, next){
        var id = req.params.id;
        
        if(streams && streams[id]){
            streams[id].close();
            delete streams[id];
            res.status(200).end();
        } else {
            res.status(404).end();
        }


    },
    erase: function (req, res, next){
        var id = req.params.id;
        
        if(streams && streams[id]){
            streams[id].close();
            delete streams[id];
        }

        redis.get('uuid:'+id, function (err, ids){
            if(err){
                res.status(500).end();
                next();
            }
            if(!ids){
                res.status(404).end(); next();
            }
            redis.del('uuid:'+id);
            redis.del('id:'+ids);
            res.status(200).end();
            next();
        });
    }
}