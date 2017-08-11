/* eslint linebreak-style: ["error", "windows"]*/

const { Product } = require('./../models/product.model');

const parseProduct = (url) => {
    return fetch(url)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error('Invalid url');
            }

            return responce.text();
        })
        .then((html) => {
            const product = Product.fromHtml(html);
            return product;
        });
};

module.exports = { parseProduct };
