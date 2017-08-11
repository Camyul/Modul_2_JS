const { Movie } = require('./../models/movie.model');

const parseMovie = (url) => {
    return fetch(url)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error('Invalid url');
            }

            return responce.text();
        })
        .then((html) => {
            const movie = Movie.fromHtml(html);
            return movie;
        });
};

module.exports = { parseMovie };