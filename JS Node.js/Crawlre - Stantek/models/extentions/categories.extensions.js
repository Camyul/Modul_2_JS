/* eslint linebreak-style: ["error", "windows"]*/

const { Category } = require('./../category.model');

const initParser = require('../../dom-parser');

const { DETAILS } = require('../../selectors');

const PRODUCT_ID_LENGTH = 8;

// static
Category.fromHtml = (html) => {
    return initParser(html)
        .then(($) => {
            const name = '';
            const ids = [];
            $(DETAILS.PRODUCT_ID)
                .each((_, el) => {
                    const href = $(el).attr('href');
                    const id = href.substr(3, PRODUCT_ID_LENGTH);
                    if (isFinite(id)) {
                        if (!ids.find((x) => x === id)) {
                            ids.push(id);
                        }
                    }
                });
            return new Category(name, ids);
        });
};
