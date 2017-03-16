"use strict";

var env = process.argv[2],
    fs = require("fs"),
    websiteUrl = "https://autoqa-materials-zone.firebaseapp.com/";

module.exports.env = env;
module.exports.websiteUrl = websiteUrl;
module.exports.fcmUrl = "https://fcm.googleapis.com/fcm/send";
module.exports.fcmHeaders = {
    "content-type": "application/json",
    "Authorization": "key=AAAAWO27nAU:APA91bE-Lz4gvO6NBnbCWr0_aDZgze2cnLCeNi_kRWY3kKSmTFIxvZ4ixmqU31r4qElnYPaOg_v0e5jkK_-r97Wv6NL9SsAbQk3cuu18PDNwSBvicgDjHZE-Qof6p4BawyGccTRn67CQrAVO2HBiqWaEhx6iaVImSA"
};
module.exports.settings = function() {
    return {
        httpPort: 9000,
        httpsPort: 4433,
        cert: {
            key: fs.readFileSync(`${__dirname}/../ssl_dev/privkey.pem`),
            cert: fs.readFileSync(`${__dirname}/../ssl_dev/cert.pem`),
            ca: [fs.readFileSync(`${__dirname}/../ssl_dev/fullchain.pem`)]
        }
    }
}
