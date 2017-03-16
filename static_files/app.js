 'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    https = require('https'),
    http = require('http'),
    port = process.env.PORT || 443,
    environment  = process.argv[2] || "dev",
    settings = require('../helpers/constants').settings();

app.all('*', ensureSecure);
function ensureSecure(req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.hostname + req.url);
}

http.createServer(app).listen(settings.httpPort);
https.createServer(settings.cert, app).listen(settings.httpsPort, null, function() {
  console.log(`----------------Start [${environment}] environment----------------`);
});

app.use(bodyParser.json())
///////////////////////////////Static/////////////////////////////////////////////
app.use(express.static(__dirname + '/../public'));
app.get('/registration', function(req, res){
  res.sendFile('index.html',  {'root': __dirname + '/../public/'});
});
//////////////////////////////Registration///////////////////////////////////////// 
require('../routes/registration')(app)
//////////////////////////////API//////////////////////////////////////////////////
app.use(function(req, res, next) {
    var allowedOrigins = ['https://autoqa-materials-zone.firebaseapp.com', 'https://autoqa.materials.zone'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, settings, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});
var mongoose = require('../helpers/mongoDB');
require('../routes/fileRoutes')(app);
require('../routes/parsersRoutes')(app);
require('../routes/logsRoutes')(app);
require('../routes/passRoutes.js')(app);
require('../routes/measurementRoute.js')(app);