var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
    post: function (req, res){
        User.findOne({
            username: req.body.username
        }, function (err, user){
            if(err) res.end();
            if(!user) res.send({err: 'User not found'});
            if(user){
                if(!user.verify(req.body.password)){
                    res.send({err: 'Bad access'});
                } else {
                    res.send({token: user._id});
                }
            }
        })
    }
}