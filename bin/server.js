var app = require('../app');
var https = require('https');
var fs = require('fs');
var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('certs/client-key.pem'),
  cert: fs.readFileSync('certs/client-cert.pem')
};

https.createServer(options, app).listen(8443);
