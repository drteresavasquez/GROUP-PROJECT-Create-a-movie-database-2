"use strict";


let firebase = require("firebase/app"),
//let the var "fireBase" be = 2 fi
    fb = require("./fb-keys"),
    fbData = fb();

require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: fbData.apiKey,
  authDomain: fbData.authDomain,
  databaseURL: fbData.databaseURL
};


firebase.initializeApp(config);

firebase.getFBsettings = () => {
    console.log("getFBsettings", config);
    return config;
};

module.exports = firebase;
