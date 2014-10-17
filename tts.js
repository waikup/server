var request = require('request')

var endpoint = 'http://130.206.82.169/tts/v1';

var key = 'AIzaSyATm-KGS58woDJ4TCfGvybV2OVlH8hT1aM';

module.exports = function (text, lang, pipe){

    // request({
    //     method: 'POST',
    //     url: endpoint,
    //     form: {text: text, lang: lang}
    // }).pipe(pipe);
    headers = {
        "Host": "translate.google.com",
        "Referer": "http://www.gstatic.com/translate/sound_player2.swf",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) "
    }

    request({
        method: 'GET',
        url: 'http://translate.google.com/translate_tts?tl='+lang+'&q='+text+'&total='+text.length,
        headers: headers
    }).pipe(pipe);

};