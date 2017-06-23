const { Genre } = require('./../models/genre.model');

const parseGenre = (url) => {
    return fetch(url)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error('Invalid url');
            }

            return responce.text();
        })
        .then((html) => {
            const genre = Genre.fromHtml(html);
            return genre;
        });
};

module.exports = { parseGenre };