'use strict';

console.log("main js loaded");

let movieAPILoader = require('../api.js'),
    $ = require('jquery'),
    build = require("./dom-builder.js");


    $("#GoMALCOLM").click(function(){
       // movieAPILoader.getMovies(550);
        console.log('movieAPILoader.getMovies(550)', movieAPILoader.getMovies(550));
        build.makeMovieCards(movieAPILoader.getMovies(550));
    });
