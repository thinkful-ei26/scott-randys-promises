'use strict';
/* eslint-env jquery*/
const axios = require('axios');
const url = 'https://swapi.co/api/people/1';


axios.get(url)
  .then(function (res) {
    // handle success
    console.log(res.data.name);
  });
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
   //}
