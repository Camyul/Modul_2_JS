const { Category } = require('./../models/category.model');

const parseCategory = (url) => {
    return fetch(url)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error('Invalid url');
            }

            return responce.text();
        })
        .then((html) => {
            const category = Category.fromHtml(html);
            return category;
        });
};

module.exports = { parseCategory };