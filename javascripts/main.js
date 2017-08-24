'use strict';

console.log("main js loaded");

let movieArray = [455,550,500,452];

let movieAPILoader = require('./api.js'),
    $ = require('jquery'),
    buildCard = require("./dom-builder.js");


    $("#GoMALCOLM").click(function(){
       // movieAPILoader.getMovies(550);
      //  console.log('movieAPILoader.getMovies(550)', movieAPILoader.getMovies(550));
      
      movieAPILoader.getMovies()
      .then((movieData)=>{
          console.log('movie data retrieved', movieData);
         // buildCard.makeMovieCards(movieData);
      });
   
    });


function loadMoviesToDOM(movieID) {
}