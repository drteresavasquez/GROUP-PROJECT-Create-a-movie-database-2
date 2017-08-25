'use strict';

let $ = require('jquery'),
    MovieAPI = require('./api.js');


function makeMovieCards(movieData){
    let card = document.createElement("div");
    card.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movieData.poster_path}">
                    <h3>${movieData.original_title}</h3>
                    <p>${movieData.release_date}</p>
                    <p>${movieData.overview}</p>
                    `;
    for (var i = 0; i < 5; i++) {
    var castArray =[];
       card.innerHTML += `<p> ${movieData.credits.cast[i].name}</p>`;
    }
    $("#movieDiv").append(card);
}

module.exports = { makeMovieCards };