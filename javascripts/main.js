'use strict';
console.log("main js loaded");


let movieAPILoader = require('./api.js'),
    $ = require('jquery'),
    buildCard = require("./dom-builder.js"),
    movieTemplate = require("../templates/movie-card.hbs"),
    handlebarHelper = require("./hbsHelpers.js");

var movieIDsArray = [];


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
            loopIDthenDOMDisplay(movieIDsArray);
        });


        // .then((movieObjArray)=>{
        //  loadMoviesToDOM(movieObjArray);
        //     console.log('movieOBJArray loads');
        
        // }); 
});

// PROMISE.ALL then loadMoviesToDOM
                
var movieObjArray = [];
function loopIDthenDOMDisplay(idArray) {
    for (let i = 0; i < idArray.length; i++) {
        requestMovieByID(idArray[i]);  
    }
    console.log('movieOBJArray out function', movieObjArray.length);
    
    loadMoviesToDOM(movieObjArray);
}
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
     console.log('load movies to dom called', movieData);
    $("#movieDiv").append(card);
}
