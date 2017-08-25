"use strict";

let Handlebars = require('hbsfy/runtime');
let movieFactory = require("./api.js");

Handlebars.registerHelper("castArray", () => {
  console.log("This is working");
  let mvObj = movieFactory.getMovies();
  let castName = "";
      for (var i = 0; i < 5; i++) {

       castName = mvObj.credits.cast[i].name;

      }


    return castName;
});
