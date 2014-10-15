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

Alarm.statics.getForUserId = function (userId){
    this.find({byUserId: userId}, function (err, doc){
        if(err) return null;
        return doc;
    });
}

Alarm.methods.disable = function (){
    this.enable = false;
}

Alarm.methods.enable = function (){
    this.enable = true;
}

module.exports = exports = mongoose.model('Alarm', Alarm);