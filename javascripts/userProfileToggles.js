"use strict";
console.log("user toggles, yo!");

//this code makes the buttons in the user view work
let userTemplate = require("../templates/userCards.hbs"),
    handlebarHelper = require("./hbsHelpers.js"),
    firebase= require("./firebase.js"),
    userMovies = require("./DOMHandlers.js");

let toggleObject = {};

//display items from watchlist to the DOM
$("#unwatched").on("click", function(){
    $(".range-field").addClass("is-hidden");
    $("#untracked").addClass("is-hidden");
    $(".appendBread").html(" ");
    $(".appendBread").append("> Unwatched Movies");
    $("#userMovies").html(" ");
    toggleObject = {};
    firebase.getWatchList()
    .then(function(data){
        let userData = Object.keys(data);
        userData.forEach((item, index)=>{
            if (data[item].watched === false){
                toggleObject[index] = data[item];
            }
        });
    })
    .then((data) => {
        // $("#userMovies").append(userTemplate(toggleObject));
        userMovies.loadMoviesToDOM(toggleObject);
    });
});

//display items from watchED to the DOM
$("#watched").click(function(){
    $(".range-field").removeClass("is-hidden");
    $("#untracked").addClass("is-hidden");
    $(".appendBread").html(" ");
    $(".appendBread").append("> Watched Movies");
    $("#userMovies").html(" ");
    toggleObject = {};
    firebase.getWatchList()
    .then(function(data){
        let userData = Object.keys(data);
        userData.forEach((item, index)=>{
            if (data[item].watched === true){
                toggleObject[index] = data[item];
            }
        });
    })
    .then((data) => {
        // $("#userMovies").append(userTemplate(toggleObject));
        userMovies.loadMoviesToDOM(toggleObject);
    });
});

//display ALL MOVIES IN USER FB to the DOM
$("#allMovies").click(function(){
    $(".range-field").addClass("is-hidden");
    $("#untracked").addClass("is-hidden");
    $("#userMovies").html(" ");
    $(".appendBread").html(" ");
    firebase.getWatchList()
    .then((data) => {
        // $("#userMovies").append(userTemplate(toggleObject));
        userMovies.loadMoviesToDOM(data);
    });
});

$("#breadcrumbs").click(function(){
    $(".range-field").addClass("is-hidden");
    $("#untracked").addClass("is-hidden");
    $("#userMovies").html(" ");
    $(".appendBread").html(" ");
    firebase.getWatchList()
    .then((data) => {
        // $("#userMovies").append(userTemplate(toggleObject));
        userMovies.loadMoviesToDOM(data);
    });
});

$("#ratingSlider").change(function(){
    $("#userMovies").html(" ");
    $("#untracked").addClass("is-hidden");
    toggleObject = {};
    var starRating = $("#ratingSlider").val();
    firebase.getWatchList()
    .then(function(data){
        let keys = Object.keys(data);
        keys.forEach((item, index)=>{
                //input is a string so no triple ===
                if(starRating == data[item].rating){
                toggleObject[index] = data[item];
            }else if (starRating == 0){
                toggleObject[index] = data[item];
            }
        });
    })
    .then((data) => {
        // $("#userMovies").append(userTemplate(toggleObject));
        userMovies.loadMoviesToDOM(toggleObject);
    });
});