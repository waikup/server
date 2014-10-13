var path = require('path');

var _ = function (modules) {
    var r = {}

    for (var i in modules){
        var module = modules[i];
        r[module] = require(path.join(__dirname, module));
    }

    return r;
}

module.exports = exports = _([
    'alarms',
    'users'
]);