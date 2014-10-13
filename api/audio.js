var streams = {}

module.exports = {
    addStream: function (req, res, next){
        var id = req.params.id;
        streams[id] = res;
    },
    getStream: function (id){
        return streams[id];
    }
}