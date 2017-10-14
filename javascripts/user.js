"use strict";

let firebase = require('../lib/node_modules/firebase');
let provider = new firebase.auth.GoogleAuthProvider();
let currentUser = null;
let handler = require('./DOMHandlers');
let fire = require('./firebase');

firebase.auth().onAuthStateChanged((user) => {
    if (user){
    //   console.log("user", user);
    $('#my-movies').html(user.displayName);
    $('#userPic').attr('src', user.photoURL);
    currentUser = user.uid;
    $("#searchView").hide();
    $("#profileView").show();
    setTimeout(fire.getWatchList()
    .then((data) => {
      handler.loadMoviesToDOM(data);
    }), 200);
    }else {
        currentUser = null;
        $("#mainSearchResults").html(" ");
        $("#profileView").hide();
        $("#searchView").show();
        // console.log("current user NOT logged in:", currentUser);
    }
});

function logInGoogle() {
    //all firebase functions return a promise!! Add a then when called
    return firebase.auth().signInWithPopup(provider);
}

function logout(){
  $('#userMovies').html('');
  $('#mainSearchResults').html('');
  return firebase.auth().signOut();
}
function getUser(){
    return currentUser;
}

function setUser(val){
    currentUser = val;
}

module.exports = {logInGoogle, logout, getUser, setUser};
