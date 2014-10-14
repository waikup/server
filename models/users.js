var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    password: String
});

var hasherino = function (string) {
    return crypto.createHash('sha256').update(string).digest('hex');
};

var randomString = function (l) {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l||16);
}

var passwordGenerator = function (password, salt){
    var salt = salt || randomString(16);
    var hash = hasherino(salt + password);
    return salt + ':' + hash;
};

User.statics.createUser = function (username, password) {
    var user = new User();
    user.username = username;
    user.password = passwordGenerator(password);
    user.save();
}

User.methods.verify = function (password) {
    return (this.password == passwordGenerator(password,
            this.password.split(':')[0]));
}

module.exports = exports = mongoose.model('User', User);