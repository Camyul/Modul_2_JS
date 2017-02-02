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
                    let typesOfProducts = [],
                        result = [];

                    if (this.products.length === 0) {
                        return result;
                    }

                    for (let i = 0, leng = this.products.length; i < leng; i += 1) {

                        let type = this.products[i].productType;
                        typesOfProducts.push(type)

                    }

                    typesOfProducts = typesOfProducts.sort();
                    result.push(typesOfProducts[0]);

                    for (let i = 1, len = typesOfProducts.length; i < len; i += 1) {
                        if (typesOfProducts[i - 1] !== typesOfProducts[i]) {
                            result.push(typesOfProducts[i]);
                        }

                    }

                    return result;
                },
                getInfo: function() {

                    function getElement(name, tprice, quantity) {
                        let element = {
                            name: name,
                            totalCost: tprice,
                            quantity: quantity
                        }
                        return element;
                    }

                    let infoObj = {
                            products: [],
                            totalPrice: function() {
                                let result = 0;

                                for (let i = 0, len = this.products.length; i < len; i += 1) {
                                    result += this.products[i].price;
                                }

                                return result;
                            }
                        },
                        sortedCart = this.products.sort(),
                        element = getElement(sortedCart[0].name, sortedCart[0].price, 1);



                    for (let i = 1, len = sortedCart.length; i < len; i += 1) {
                        if (sortedCart[i - 1].name !== sortedCart[i].name) {
                            infoObj.products.push(element);
                            element = getElement(sortedCart[i].name, sortedCart[i].price, 1);
                            if (i === len - 1) {
                                infoObj.products.push(element);
                            }
                        } else {
                            element.totalCost += sortedCart[i].price;
                            element.quantity += 1;
                        }
                    }


                    return infoObj;
                }
            }

            return shopingCart;
        }
    };
}

module.exports = solve();