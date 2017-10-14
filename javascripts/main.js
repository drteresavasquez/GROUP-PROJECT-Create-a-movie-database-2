'use strict';

let movieAPILoader = require('./api.js'),
    handlebarHelper = require("./hbsHelpers.js"),
    handlers = require("./DOMHandlers.js"),
    firebase= require("./firebase.js"),
    user = require("./user.js"),
    toggleKeys = require("./userProfileToggles.js");

var movieIDsArray = [];
var movieObjArray = [];

let testInput = {
  title: "Michael",
  overview: "hello I am michael",
  poster_path: "/lakdjfaklsdfjas.jpg",
  id: 238,
  release_date: '1972-03-14',
  rating: 0,
  watched: false,
  inFB: false,
  uid: 111
};

user.logout();
// firebase.testPush(testInput);

$("#searchBar").on('keyup', function(e){ //clicks or presses enter
    // gets value from search
    if (e.keyCode === 13) {
      $('#mainSearchResults').html('');
      $("#userMovies").html('');
      let movieSearch = document.getElementById("searchBar").value;
      let movieObject = {};
      $("#mainSearchResults").html(" ");
      movieAPILoader.getMovies(movieSearch)
        .then((movieData)=>{
          if (movieData.results.length === 0) {
            $('#mainSearchResults').append(`<h2 style="color:white;text-align:center">Your search returned no results.</h2>`);
          } else {
            let movies = movieData.results;
            $(movies).each((index, item)=>{
              let year = item.release_date.slice(0, item.release_date.indexOf('-'));
              if (item.poster_path === null) {
               movieObject[index] = {
                 title: item.title,
                 year: year,
                 poster: 'images/noPosterPH.jpg',
                 overview: item.overview,
                 movieID: item.id,
                 rating: 0,
                 watched: false,
                 inFB: false
               };
               } else {
               movieObject[index] = {
                title: item.title,
                year: year,
                poster: `http://image.tmdb.org/t/p/w342${item.poster_path}`,
                overview: item.overview,
                movieID: item.id,
                rating: 0,
                watched: false,
                inFB: false
              };
               }
            });
          }
          //  console.log("movieObject", movieObject);
          //  handlers.loadMoviesToDOM(movieObject);
          handlers.loadMoviesToDOM(movieObject);
          $("#searchBar").val(function() {
            if (this.value.length == 0) {
              return $(this).attr('placeholder');
            }
          });
        });
    }
});

$('#userSearchBar').on('keyup', function(e) {
  if (e.keyCode === 13) {
    $('#mainSearchResults').html('');
    $("#userMovies").html('');
    $("#untracked").removeClass("is-hidden");
    $(".range-field").addClass("is-hidden");
    $(".appendBread").html("> Search Results");
    var movieObj = {};
    $("#untracked").fadeIn(2000).removeClass("is-hidden");
    firebase.getWatchList()
    .then((data) => {
      let movieIDArr = [];
      let movieRatingArr = [];
      let movieKeys = Object.keys(data);
      $(movieKeys).each((findex, fitem) => {
        movieIDArr.push(data[fitem].movieID);
        movieRatingArr.push(data[fitem].rating);
      });
      let search = $('#userSearchBar').val();
      movieAPILoader.getMovies(search)
      .then((movieData) => {
        if (movieData.results.length === 0) {
          $('#userMovies').append(`<h2 style="text-align:center">Your search returned no results.</h2>`);
        } else {
          let movies = movieData.results;
          $(movies).each((mindex, mitem) => {
            let year = mitem.release_date.slice(0, mitem.release_date.indexOf('-'));
            if (mitem.poster_path === null) {
                movieObj[mindex] = {
                  title: mitem.title,
                  year: year,
                  poster: 'images/noPosterPH.jpg',
                  overview: mitem.overview,
                  movieID: mitem.id,
                  rating: 0,
                  watched: false,
                  inFB: false
                };
            } else {
            movieObj[mindex] = {
              title: mitem.title,
              year: year,
              poster: `http://image.tmdb.org/t/p/w342${mitem.poster_path}`,
              overview: mitem.overview,
              movieID: mitem.id,
              rating: 0,
              watched: false,
              inFB: false
              };
            }

            if (movieIDArr.indexOf(mitem.id) !== -1) {
               movieObj[mindex].inFB = true;
               let thisMovieIndex = movieIDArr.indexOf(mitem.id);
               movieObj[mindex].rating = movieRatingArr[thisMovieIndex];
            }
          });
        }
        handlers.loadMoviesToDOM(movieObj);
        handlers.untracked();
        $("#userSearchBar").val(function() {
          if (this.value.length == 0) {
            return $(this).attr('placeholder');
          }
        });
      });
      // handlers.loadMoviesToDOM(data);
      // $("#userMovies").append(movieTemplate(data));
    });
  }
});

//This is where we are starting the firebase logInGoogle
$("#auth-btn").click(function() {
  console.log("clicked auth");
  user.logInGoogle();
});
$("#logout").click(() => {
  console.log("logout clicked");
  user.logout();
  $("#profileView").hide();
  $("#searchView").show();
});
