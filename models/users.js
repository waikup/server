var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

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

var UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.methods.verify = function (password) {
    return (this.password == passwordGenerator(password,
            this.password.split(':')[0]));
}

UserSchema.statics.isUsernameFree = function (username){
    this.findOne({username: username}, function (err, doc){
        if(err) return false;
        if(!doc) return true;
        return false;
    });
}

var User = mongoose.model('User', UserSchema);

User.create = function (username, password) {
    var user = new User();
    user.username = username;
    user.password = passwordGenerator(password);
    user.save();
    return user;
}

module.exports = exports = User;