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
    var m = this;
    redis.get('uuid:user:'+uuid, function (err, userId){
        var d = new Date();
        var time = d.getHours()+''+d.getMinutes();
        m.findOne({fromUser: '544029c9e670f41eb1954656'}, cb);
    });
}

Alarm.statics.getForUserId = function (userId, cb){
    this.findOne({fromUser: userId}, cb);
}

var _ = mongoose.model('Alarm', Alarm);

// define prototype here yo

module.exports = exports = _;