var mongoose = require('mongoose');
var Plugin = require('./plugin');
var Schema = mongoose.Schema;
var redis = require('redis').createClient();
var Alarm = new Schema({
    fromUser: String,
    time: Number,
    plugins: Object,
    enable: Boolean
});

Alarm.statics.getAlarmByUuid = function (uuid, cb){
    redis.get('uuid:user:'+uuid, function (err, userId){
        var d = new Date();
        var time = d.getHours()+''+d.getMinutes();
        this.findOne({fromUser: userId}, cb);
    })
}

Alarm.statics.getForUserId = function (userId, cb){
    this.find({fromUser: userId}, cb);
}

var _ = mongoose.model('Alarm', Alarm);

// define prototype here yo

module.exports = exports = _;