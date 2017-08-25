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

//var movieSearch = "Star";

 MovieAPI.getMovies = (movieSearch) => {
	return new Promise((resolve, reject) => {
		// console.log("url", `${MovieAPI.getMDBSettings().databaseURL}/3/search/movie/?api_key=${MovieAPI.getMDBSettings().apiKey}&language=en-US&query=${movieSearch}&page=1&include_adult=false&append_to_response=credits}`);
		$.ajax({
           url: `${MovieAPI.getMDBSettings().databaseURL}/3/search/movie?api_key=${MovieAPI.getMDBSettings().apiKey}&language=en-US&query=${movieSearch}&page=1&include_adult=false&append_to_response=credits`
		}).done((movieData) => {
			//console.log("movieData in promise", movieData);
			resolve(movieData);
		}).fail((error) => {
			reject(error);
		});
	 });
};


module.exports = MovieAPI;