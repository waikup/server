var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
    post: function (req, res, next){
        if(req.body.username && req.body.password){
            User.isUsernameFree(req.body.username, function (free){
                if(!free){
                    return res.send({success: false})
                } else {
                    var user = User.create(req.body.username, req.body.password);
                    res.send({success: true, token: user._id});
                }
            });
        } else {   
            res.send({err: 'Username or password was not provided'});
        }
    }
}