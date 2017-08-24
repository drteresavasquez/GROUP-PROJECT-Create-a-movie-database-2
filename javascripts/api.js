"use strict";
// movie database api configure
console.log("api.js loaded");

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


 MovieAPI.getMovies = (movieID) => {
	return new Promise((resolve, reject) => {
		// console.log("url", `${MovieAPI.getMDBSettings().databaseURL}/3/movie/550?api_key=${MovieAPI.getMDBSettings().apiKey}`);
		$.ajax({
			url: `${MovieAPI.getMDBSettings().databaseURL}/3/movie/${movieID}?api_key=${MovieAPI.getMDBSettings().apiKey}`
		}).done((movieData) => {
			console.log("movieData in promise", movieData);
			resolve(movieData);
		}).fail((error) => {
			reject(error);
		});
	 });
};


module.exports = MovieAPI;