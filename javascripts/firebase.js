'use strict';

var firebase = require('firebase'),
    fb = require("./fb-keys"),
    fbData = fb();
var movies = require('./api');
var $ = require('jquery');
var config = {
  apiKey: fbData.apiKey,
  authDomain: fbData.authDomain,
  databaseURL: fbData.databaseURL,
  projectId: "moviehistorydb",
  storageBucket: "moviehistorydb.appspot.com",
  messagingSenderId: "1015573230583"
};

firebase.initializeApp(config);

// movies.getMovies('the godfather')
// .then((data) => {
//   console.log("data", data);
// });

let fdr = firebase.database();
var fire = {
  getCurrentUser: function(){
    if (firebase.auth().currentUser !== null) {
      return firebase.auth().currentUser.uid;
    } else {

    }
  },

  addToFB: function(item) {
    let dbRef = fdr.ref();
    dbRef.push({
      title: item.title,
      year: item.year,
      poster: item.poster,
      overview: item.overview,
      movieID: item.movieID,
      rating: item.rating,
      watched: item.watched,
      inFB: item.inFB,
      uid: item.uid
    });
  },

  getWatchList: function() {
    return new Promise((resolve, reject) => {
      let userID = fire.getCurrentUser();
      $.ajax({
        url: `https://moviehistorydb.firebaseio.com/.json?orderBy="uid"&equalTo="${userID}"`
      }).done((data) => {
        resolve(data);
      });
    });
  },

  removeFromFB: function(id) {
    fire.getWatchList()
    .then((data) => {
      let keys = Object.keys(data);
      let correctUgly;
      $(keys).each((index, item) => {
        let eachMovie = data[item];
        if (eachMovie.movieID === id) {
          correctUgly = keys[index];
        }
      });
      fdr.ref(`/${correctUgly}`).remove();
    });
  },

  updateRating: function(uglyID, rating) {
    let dbRef = fdr.ref(`/${uglyID}`);
    dbRef.update({
      rating: rating,
      watched: true
    });
  }
};

module.exports = fire;
