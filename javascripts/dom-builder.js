'use strict';

let $ = require('jquery'),
    MovieAPI = require('./api.js');


function makeMovieCards(movie){
    let card = document.createElement("div");
    card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h3>${movie.original_title}</h3>
                    <p>${movie.release_date}</p>
                    <p>${movie.overview}</p>
                    `;
    for (var i = 0; i < 5; i++) {
    var castArray =[];
       card.innerHTML += `<p> ${movie.credits.cast[i].name}</p>`;
    }
    $("#movieDiv").append(card);
}

module.exports = { makeMovieCards };