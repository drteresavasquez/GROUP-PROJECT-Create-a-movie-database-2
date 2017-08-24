'use strict';

let $ = require('jquery');


function makeMovieCards(movie){
    let card = document.createElement("div");
    card.innerHTML = `
                    <h3>${movie.original_title}</h3>
                    <p>${movie.release_date}</p>
                    <p>${movie.overview}</p>
    
    `;

    $("#movieDiv").append(card);
}

module.exports = makeMovieCards;