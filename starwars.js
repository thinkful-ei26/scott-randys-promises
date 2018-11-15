'use strict';
/* eslint-env jquery*/


const axios = require('axios');
const url = 'https://swapi.co/api/people/?search=';
const searchTerm = process.argv[2];



axios.get(`${url}${searchTerm}`)
  .then(function(res) {
    const gender = res.data.results[0].gender === 'male' ? 'he' : 'she';
    console.log(`${res.data.results[0].name} has been found!

   ${gender} has also been associated with a
    total of ${res.data.results[0].vehicles.length} vehicles
     and ${res.data.results[0].starships.length} starships.`
    );

    //console.log(res.data.results[0]);
    let films = res.data.results[0].films.map(filmURL => axios.get(filmURL));
    //console.log(films); why is this pending
    return Promise.all(films);
  })
  .then(function (res) {

    const filmArray = res.map(film => ({title: film.data.title, releaseDate: film.data.release_date}));
    function compare(a, b) {
      if (a.releaseDate < b.releaseDate)
        return -1;
      if (a.releaseDate > b.releaseDate)
        return 1;
      return 0;
    }
    filmArray.sort(compare);
    console.log();
  })
  .catch(function (error) {
    console.log( `${searchTerm} is not an entity we're looking for. Move along.`);
  });

// .then(function (res) {
//   axios.get('https://swapi.co/api/films')
// }
