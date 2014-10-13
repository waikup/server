var redis = require('redis').createClient();
var uuid = require('node-uuid');

var streams = {}

module.exports = {
    addStream: function (req, res, next){
        var id = req.params.id;
        streams[id] = res;
    },
    getStream: function (id){
        return streams[id];
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
                client_id: id
            });

        })
    },
    shutup: function (req, res, next){
        var id = req.params.id;
        streams[id].close();
        delete streams[id];
        redis.get('uuid:'+id, function (err, ids){
            _ids = ids.split('-');
            redis.del('uuid:'+id);
            redis.del('id:'+ids);
        });
    }
}