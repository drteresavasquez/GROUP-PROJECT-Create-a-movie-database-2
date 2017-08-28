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

    movieAPILoader.getMovies(movieSearch)
        .then((movieData)=>{
           // console.log('movie data retrieved', movieData);
           movieData.results.forEach((movie)=>{
               requestMovieByID(movie);
           });
        });
});

function requestMovieByID(movieID) {
    movieAPILoader.getMoviesWithCredits(movieID.id)
        .then((movieDataWithCredits)=>{
        movieObjArray = [];
        movieObjArray.push(movieDataWithCredits);
        loadMoviesToDOM(movieObjArray);
        }); 
}

function loadMoviesToDOM(movieData) {
    $("#movieDiv").append(movieTemplate(movieData));
}
