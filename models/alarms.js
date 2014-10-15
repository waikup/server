var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Plugin = new Schema({
    uuid: String,
    settings: Object
});

var Alarm = new Schema({
    byUserId: String,
    time: Number,
    plugins: [Plugin]
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

module.exports = exports = mongoose.model('Alarm', Alarm);