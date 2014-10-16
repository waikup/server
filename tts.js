var request = require('request')

var endpoint = 'http://130.206.82.169/tts/v1';

module.exports = function (text, lang, pipe){

    request({
        method: 'POST',
        url: endpoint,
        form: {text: text, lang: lang}
    }).pipe(pipe);

};