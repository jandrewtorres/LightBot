var apiai = require('apiai');
var CLIENT_ACCESS_TOKEN = '4bd689089e95495282161c91f4a5ce10'
var app = apiai(CLIENT_ACCESS_TOKEN);

exports.getresponse = function(inputstring,callback){
    var request = app.textRequest(inputstring);
    request.on('response', function(response) {
        callback(null,response);
    });
    request.on('error', function(error) {
        callback(error,null);
    });
    request.end();
};
