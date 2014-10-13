var path = require('path');

var _ = function (module) {
    return require(path.join(__dirname, module));
}


module.exports = {
    main: _('main')
}