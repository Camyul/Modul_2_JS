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
                        throw new Error('shopingCart don\'t contain this product');

                    }

                    return this;
                },
                showCost: function() {},
                showProductTypes: function() {},
                getInfo: function() {}
            }

            return shopingCart;
        }
    };
}

module.exports = solve();