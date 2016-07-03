var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.enable('trust proxy');

app.get('/', function(request, response) {
  var dtstr = request.params.dtstr;
  var ip = request.ip;
  var lang = request.get("accept-language").split(",")[0];
  var software = request.get("user-agent");

  software = parseUserAgent(software);

  response.send( { ipaddress:ip, language:lang, software:software});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var parseUserAgent = function(s) {
  return s.substring(s.indexOf("(")+1,s.indexOf(")"));
}