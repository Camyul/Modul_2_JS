/* eslint linebreak-style: ["error", "windows"]*/

require('./polyfills');

// get the movies and add them to a queue
const categoriesUrlBase = 'http://stantek.com/';
const categories = ['?q=Speakers'];
const pageUrl = '%3A&page=1';

const { parseCategory } = require('./parsers/category.parser');

const { parseProduct } = require('./parsers/product.parser');


require('./models/extentions');

// const moviesIds = [];
const products = [];
const PRODUCT_URL = 'http://stantek.com/?i=';

const loadProduct = (queue) => {
    if (queue.isEmpty()) {
        return Promise.resolve();
    }
    const id = queue.pop();
    const url = PRODUCT_URL + id;
    return parseProduct(url)
        .then((item) => {
            products.push(item);
            return loadProduct(queue);
        });
};

const loadProducts = (queue) => {
    const PARALEL_LOADS = 16;
    return Promise.all(
            Array.from({ length: PARALEL_LOADS })
            .map((_) => loadProduct(queue)))
        .then(() => {
            products.forEach((x) => {
                console.log(x.title);
                console.log(x.price);
                console.log(x.description);
                console.log(x.productImgUrl);
            });
            console.log(products.length);
        });
};

const queue = require('./queue').getQueue();

Promise.all(
        categories.map((genre) => {
            const url = categoriesUrlBase + genre + pageUrl;
            return parseCategory(url)
                .then((g) => {
                    queue.pushMany(...g.productsIds);
                });
        }))
    .then(() => {
        return loadProducts(queue);
    });
