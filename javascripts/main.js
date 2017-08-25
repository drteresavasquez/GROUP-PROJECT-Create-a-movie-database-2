'use strict';
console.log("main js loaded");


let movieAPILoader = require('./api.js'),
    $ = require('jquery'),
    buildCard = require("./dom-builder.js"),
    movieTemplate = require("../templates/movie-card.hbs"),
    handlebarHelper = require("./hbsHelpers.js");

var movieIDsArray = [];
var movieObjArray = [];

$("#GoMALCOLM").click(function(){ //clicks or presses enter
    // gets value from search
    let movieSearch = document.getElementById("searchBar").value;

    // let movieSearch = "Star";

    movieAPILoader.getMovies(movieSearch)
        .then((movieData)=>{
            console.log('movie data retrieved', movieData);
            for (let i = 0; i < movieData.results.length; i++) {
                movieIDsArray.push(movieData.results[i].id);
            }  
            for (let i = 0; i < movieIDsArray.length; i++) {
                requestMovieByID(movieIDsArray[i]);
            }
        })
        .then((movieObjArray)=>{
          console.log('movieOBJArray loads');
          
        }); 
});

// PROMISE.ALL then loadMoviesToDOM
                
function requestMovieByID(movieID) {
movieAPILoader.getMoviesWithCredits(movieID)
    .then((movieDataWithCredits)=>{
         console.log('movieDataWithCredits', movieDataWithCredits);
       movieObjArray.push(movieDataWithCredits);
    });

}


function loadMoviesToDOM(movieData) {
    let card = document.createElement("div");
    card.innerHTML = movieTemplate(movieData);
    // console.log('load movies to dom called');

    $("#movieDiv").append(card);

}
