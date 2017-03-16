"use strict";

var firebaseOptions = {
  serviceAccount: "./vendor/credentials/autoqa-materials-zone-805a3d0468f4.json",
  databaseURL: "https://autoqa-materials-zone.firebaseio.com"
};

var firebase = require("firebase")
.initializeApp(firebaseOptions)
.database();

console.log("Start firebase database connection");
console.log("serviceAccount: " + firebaseOptions.serviceAccount);
console.log("databaseURL: " + firebaseOptions.databaseURL);
module.exports = firebase;