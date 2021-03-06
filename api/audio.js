var redis = require('redis').createClient();
var uuid = require('node-uuid');
var mongoose = require('mongoose');

var request = require('request');

var Alarm = mongoose.model('Alarm');

var timeGen = function (){
    var t = new Date;
    var m = t.getMinutes(),
        h = t.getHours()
    return 1111;
}

var running_alarm_step = {};
var running_alarm_step_counter = {};

var playPluginWithId = function (id, attr, stream, cb){
    try {
        var p = require(process.cwd() + '/plugins/' + id + '/index.js');
        p(stream, attr, cb);

    } catch (e){
        console.log(e);
        return stream.status(500).send('FAILERINO');
        cb(e);
    }
}

module.exports = {
    stream: function (req, res, next){
        var id = req.params.id;

        Alarm.getAlarmByUuid(id, function (err, alarm){
            if(err) return res.send(500);
            if(!alarm) return res.send(404);

            if(running_alarm_step_counter[uuid] == undefined){
                console.log('FIRST REQUEST');
                running_alarm_step_counter[uuid] = 0;
            }

            if(running_alarm_step_counter[uuid] % 2 == 0){
                running_alarm_step_counter[uuid] += 1;

                console.log('IGNORING REQUEST');

                return res.send(500);
            } else {

                if(running_alarm_step && running_alarm_step[uuid] >= 0){
                    
                    console.log('STEP:' + running_alarm_step[uuid]);
                    var i = running_alarm_step[uuid];
                    
                    var to_run = Object.keys(alarm.plugins)[i];

                    if(!to_run){
                        console.log('NOMOAR');
                        delete running_alarm_step[uuid];
                        return res.send(404);
                    }

                    console.log('RUN-STEP', to_run);


                    var attr = alarm.plugins[to_run] || {};
                    running_alarm_step[uuid] += 1;
                    playPluginWithId(to_run, attr, res, function (err){
                        console.log(err, 'Pluging finished playing');
                    });

                } else if ( alarm.enable && alarm.time ){
                    console.log('Saying good morning');
                    running_alarm_step[uuid] = 0;
                    playPluginWithId('alarm', {text: 'Good morning!', lang: 'en'}, res, function (err){
                        console.log(err, 'Pluging finished playing');
                    });

                } else {
                    res.send('NON PLAYERINOS');
                }

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
        res.status(200).end();
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