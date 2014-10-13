var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    password: String
});

User.statics.createUser = function (username, password) {
    var user = new User();

}

module.exports = exports = mongoose.model('User', User);