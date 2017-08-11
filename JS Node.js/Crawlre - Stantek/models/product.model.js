/* eslint linebreak-style: ["error", "windows"]*/

class Product {
    constructor(title, productImgUrl, description, price) {
        this.title = title;
        this.productImgUrl = productImgUrl;
        this.description = description;
        this.price = price;
    }
}

module.exports = { Product };
