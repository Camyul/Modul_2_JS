/* eslint linebreak-style: ["error", "windows"]*/
require('./polyfills');

// get the movies and add them to a queue
const genresUrlBase = 'http://www.imdb.com/genre/';
const genres = ['animation', 'action',
    'fantasy', 'comedy', 'romance', 'drama',
    'horror', 'adventure',
];

const { parseGenre } = require('./parsers/genre.parser');

const { parseMovie } = require('./parsers/movie.parser');


require('./models/extentions');

// const moviesIds = [];
const movies = [];

const loadMovie = (queue) => {
    if (queue.isEmpty()) {
        return Promise.resolve();
    }
    const id = queue.pop();
    const url = 'http://www.imdb.com/title/' + id;
    return parseMovie(url)
        .then((movie) => {
            movies.push(movie);
            return loadMovie(queue);
        });
}

const loadMovies = (queue) => {
    const PARALEL_LOADS = 64;
    return Promise.all(
            Array.from({ length: PARALEL_LOADS })
            .map((_) => loadMovie(queue)))
        .then(() => {
            console.log(movies);
        });
};

const queue = require('./queue').getQueue();

Promise.all(
        genres.map((genre) => {
            const url = genresUrlBase + genre;
            return parseGenre(url)
                .then((g) => {
                    queue.pushMany(...g.moviesIds);
                });
        }))
    .then(() => {
        return loadMovies(queue);
    });

//get the movies and get movies data



/*Promise.all([
    parseMovie('http://www.imdb.com/title/tt4425200/'),
    parseMovie('http://www.imdb.com/title/tt4154664/')
]).then(([m1, m2]) => {
    console.log(m1);
    console.log(m2);
});*/