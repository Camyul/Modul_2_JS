function solve() {
    function getProduct(productType, name, price) {
        let product = {
            productType: productType,
            name: name,
            price: price
        }

        return product;
    }

    function getShoppingCart() {}

    return {
        getProduct: getProduct,
        getShoppingCart: function getShoppingCart() {
            let shopingCart = {
                products: [],
                add: function(args) {

                    this.products.push(args);

                    return this;
                },
                remove: function(args) {
                    let index = this.products.indexOf(args);

                    if (this.products.length === 0) {
                        throw new Error('shopingCart is Empty');
                    }
                    if (index > -1) {
                        this.products.splice(index, 1);
                    } else {
                        throw new Error(`shopingCart don't contain this product`);

                    }

                    return this;
                },
                showCost: function() {
                    let sum = 0,
                        len;

                    if (this.products.length === 0) {
                        return sum;
                    }

                    for (let i = 0, len = this.products.length; i < len; i += 1) {
                        sum += this.products[i].price;
                    }

                    return sum;
                },
                showProductTypes: function() {
                    let typesOfProducts = [];

                    if (this.products.length === 0) {
                        return typesOfProducts;
                    }

                    /*function checkExistType(prod) {

                        for (let i = 0, len = this.products.length; i < len; i += 1) {
                            if (prod.productType === typesOfProducts[i]) {
                                return true;
                            }
                        }

                        return false;
                    }*/

                    for (let i = 0, leng = this.products.length; i < leng; i += 1) {
                        let type = this.products[i].productType;


                        typesOfProducts.push(type)

                    }
                    //typesOfProducts = typesOfProducts.sort();
                    return typesOfProducts;
                },
                getInfo: function() {}
            }

            return shopingCart;
        }
    };
}

module.exports = solve();