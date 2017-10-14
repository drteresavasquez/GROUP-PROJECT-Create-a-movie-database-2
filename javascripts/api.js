"use strict";
// movie database api configure
let MovieAPI = {};

let $ = require("jquery"),
    mdb = require("./mdb-keys"),
    mdbData = mdb();

var config = {
                apiKey: mdbData.apiKey,
                authDomain: mdbData.authDomain,
                databaseURL: mdbData.databaseURL
};

 MovieAPI.getMDBSettings = function(){
    // console.log("getMDBSettings", config);
     return config;
};

 MovieAPI.getMovies = (movieSearch) => {
	return new Promise((resolve, reject) => {
		$.ajax({
           url: `${MovieAPI.getMDBSettings().databaseURL}/3/search/movie?api_key=${MovieAPI.getMDBSettings().apiKey}&language=en-US&query=${movieSearch}&page=1&include_adult=false`
		}).done((movieData) => {
			//console.log("movieData in promise", movieData);
			resolve(movieData);
		}).fail((error) => {
			reject(error);
		});
	 });
};

MovieAPI.getCredits = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${MovieAPI.getMDBSettings().databaseURL}/3/movie/${id}/credits?api_key=${MovieAPI.getMDBSettings().apiKey}&language=en-US`
    }).done((data) => {
      resolve(data);
    });
  });
};

MovieAPI.getSingleMovie = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${MovieAPI.getMDBSettings().apiKey}&language=en-US`
    }).done((data) => {
      resolve(data);
    });
  });
};

module.exports = MovieAPI;
