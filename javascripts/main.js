'use strict';
console.log("main js loaded");


let movieAPILoader = require('./api.js'),
    $ = require('jquery'),
    buildCard = require("./dom-builder.js"),
    movieTemplate = require("../templates/movie-card.hbs"),
    handlebarHelper = require("./hbsHelpers.js"),
    firebase= require("./firebase.js"),
    user = require("./user.js");


$("#GoMALCOLM").click(function(){ //clicks or presses enter
    // gets value from search
    let movieSearch = document.getElementById("searchBar").value;

    // let movieSearch = "Star";

    // movieAPILoader.getMovies(movieSearch)
    //     .then((movieData)=>{
    //         console.log('movie data retrieved', movieData);
    //         loadMoviesToDOM(movieData.results);
    //     });
});






//This is where we are starting the firebase logInGoogle
$("#auth-btn").click(function() {
  console.log("clicked auth");
  user.logInGoogle();
});
$("#logout").click(() => {
  console.log("logout clicked");
  user.logout();
});




// function loadMoviesToDOM(movieData) {
//     let card = document.createElement("div");
//     card.innerHTML = movieTemplate(movieData);
//     // console.log('load movies to dom called');
//
//     $("#movieDiv").append(card);
//
// }
// });
// $("#logout").click(() => {
//   console.log("logout clicked");
//   user.logOut();
// });
