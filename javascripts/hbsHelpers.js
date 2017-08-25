"use strict";

let Handlebars = require('hbsfy/runtime');
let movieFactory = require("./api.js");

movieFactory.getMovies();

Handlebars.registerHelper("castArray", (value) => {
      for (var i = 0; i < 5; i++) {

       credits.cast[i].name;

      }


    return ;
});
