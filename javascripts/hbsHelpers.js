"use strict";

let Handlebars = require('hbsfy/runtime');
let movieFactory = require("./api.js");

Handlebars.registerHelper('alreadyFB', (movieObj) => {
  if (movieObj.inFB === true) {
    return new Handlebars.SafeString(`<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons removeButton" onclick="Materialize.toast('Movie Removed!', 3000, 'red');" id="removeButton--${movieObj.movieID}">remove</i></a>`);
  } else {
    return new Handlebars.SafeString(`<a class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons addButton" onclick="Materialize.toast('Movie Added!', 3000, 'green');" id="addButton--${movieObj.movieID}" rating=0>add</i></a>`);
  }
});
