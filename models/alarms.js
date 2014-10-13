var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Alarm = new Schema({
    name: String,
    byUserId: String,
    ts: Number
});

Alarm.statics.getAlarmsToPerform = function (cb) {
    this.find({ts: { $lt: Date.now()+1}}, cb);
}

module.exports = exports = mongoose.model('Alarm', Alarm);