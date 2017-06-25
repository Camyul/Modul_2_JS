/* eslint linebreak-style: ["error", "windows"]*/

const { Product } = require('../product.model');
const initParser = require('../../dom-parser');

const { DETAILS } = require('../../selectors');

// instance
Product.prototype.instanceMethod = () => {

};

// static
Product.fromHtml = (html) => {
    return initParser(html)
        .then(($) => {
            const title = $(DETAILS.TITLE_SELECTOR).html();
            // title = title.substring(0, title.indexOf('&nbsp;<span '));
            const posterUrl = $(DETAILS.POSTER_IMG_URL).attr('src');
            const description = $(DETAILS.DESCRIPTION).html();
            let price = $(DETAILS.PRICE).text();
            price = price.substr(5, 6);
            price = (parseFloat(price) / 100).toFixed(2);
            return new Product(title, posterUrl, description, price);
        });
};
