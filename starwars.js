'use strict';
/* eslint-env jquery*/


const axios = require('axios');
const url = 'https://swapi.co/api/people/?search=';
const searchTerm = process.argv[2];



axios.get(`${url}${searchTerm}`)
  .then(function (res) {
    console.log(`${res.data.results[0].name} has been found!
    ////////////// ${res.data.results[0].name} has also been associated with a total of ${res.data.results[0].vehicles.length} vehicles and ${res.data.results[0].starships.length} starships.`
    ); 
    let promises = res.data.results[0].films.map(filmURL => axios.get(filmURL));
    return Promise.all(promises);
  })
  .then(function (res) {
    res.forEach(result => console.log(result.data));
  })
  .catch(function (error) {
    console.log( `${searchTerm} is not an entity we're looking for. Move along.`);
  });
  
  // .then(function (res) {
  //   axios.get('https://swapi.co/api/films') 
  // }