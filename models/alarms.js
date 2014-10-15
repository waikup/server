var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Plugin = new Schema({
    uuid: String,
    settings: Object
});

var Alarm = new Schema({
    fromUser: String,
    time: Number,
    plugins: [Plugin],
    enable: Boolean
});

Alarm.statics.getAlarmsToPerform = function (cb){
    var d = new Date();
    var time = d.getHours()+d.getMinutes();
    
    var Alarm = mongoose.model('Alarm');
    this.find({time: time}, cb);
}

Alarm.statics.getForUserId = function (userId, cb){
    this.find({byUserId: userId}, cb);
}

var _ = mongoose.model('Alarm', Alarm);

// define prototype here yo

module.exports = exports = _;