/* eslint linebreak-style: ["error", "windows"]*/
require('./polyfills');

// get the movies and add them to a queue
const genresUrlBase = 'http://www.imdb.com/genre/';
const genres = ['animation', 'action',
    'fantasy', 'comedy', 'romance', 'drama',
    'horror', 'adventure',
];

const { Movie } = require('./models/movie.model');

require('./models/extentions');

const { parseGenre } = require('./parsers/genre.parser');

genres.forEach((genre) => {
    const url = genresUrlBase + genre;
    parseGenre(url)
        .then((g) => {
            console.log(g.name);
        });
});

const movies = [];

//get the movies and get movies data



/*Promise.all([
    parseMovie('http://www.imdb.com/title/tt4425200/'),
    parseMovie('http://www.imdb.com/title/tt4154664/')
]).then(([m1, m2]) => {
    console.log(m1);
    console.log(m2);
});*/