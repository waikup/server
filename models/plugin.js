var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Plugin = new Schema({
    uuid: String,
    settings: Object
});

module.exports = exports = mongoose.model('Plugin', Plugin);