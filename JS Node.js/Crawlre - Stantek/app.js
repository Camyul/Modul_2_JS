/* eslint linebreak-style: ["error", "windows"]*/

require('./polyfills');

// get the movies and add them to a queue
const categoriesUrlBase = 'http://stantek.com/';
const categories = ['?q=GSM:'];

const { parseCategory } = require('./parsers/category.parser');

const { parseProduct } = require('./parsers/product.parser');


require('./models/extentions');

// const moviesIds = [];
const products = [];

const loadProduct = (queue) => {
    if (queue.isEmpty()) {
        return Promise.resolve();
    }
    const id = queue.pop();
    const url = 'http://stantek.com/?i=' + id;
    return parseProduct(url)
        .then((item) => {
            products.push(item);
            return loadProduct(queue);
        });
};

const loadProducts = (queue) => {
    const PARALEL_LOADS = 64;
    return Promise.all(
            Array.from({ length: PARALEL_LOADS })
            .map((_) => loadProduct(queue)))
        .then(() => {
            console.log(products);
        });
};

const queue = require('./queue').getQueue();

Promise.all(
        categories.map((genre) => {
            const url = categoriesUrlBase + genre;
            return parseCategory(url)
                .then((g) => {
                    queue.pushMany(...g.productsIds);
                });
        }))
    .then(() => {
        return loadProducts(queue);
    });
