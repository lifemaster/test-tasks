'use strict';

var admin = require("firebase-admin");
let certPath = "../vendor/credentials/autoqa-materials-zone-805a3d0468f4.json";
let cert = require(certPath);
let firebase = require("../models/firebase-database"),
    firebaseOptions = {
      serviceAccount: cert,
      databaseURL: "https://test-materials-zone.firebaseio.com"
    };
admin.initializeApp(firebaseOptions);

function isAuthenticated(req, res, next) {
    admin.auth().verifyIdToken(req.headers.authorization)
        .then(function(decodedToken) {
            var uid = decodedToken.uid;
            getUser(uid).then(user => {
              req.user = user;
              next();
            }).catch(err => {res.status(403).send('cannot find user')});
        }).catch(function(error) {
            res.status(403).send(error);
        });
}

function getUser(id) {
  return new Promise((res, rej) =>{
    firebase.ref(`Users/${id}`)
      .once('value', function(s) {
        let user = {};
        if(!s.val()){
          rej();
        }else{
          user = s.val();
          user.fbKey = id;
          res(user);
        }
    });
  });

}
module.exports = isAuthenticated;