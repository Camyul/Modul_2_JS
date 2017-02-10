function solve() {
    let getNextId = (function() {
        let counter = 0;
        return function() {
            counter += 1;
            return counter;
        };
    })();

    function validateStringLenght(str, min, max) {
        if (typeof(str) !== 'string') {
            throw Error('The Value Must Be a String');
        }

        validateNumberRange(str.length, min, max);

    }

    function validateNumberRange(num, min, max) {
        if (typeof(num) !== 'number' && (num < min || num > max)) {
            throw Error("The number is not a valid!");
        }
    }

    function validateStringIsNull(str) {
        if (str === null) {
            throw Error('The string is Null');
        }
    }

    function validateNumberIsbn(isbn) {
        if (typeof(isbn) !== 'string' || !isbn.match(/^([0-9]{10}|[0-9]{13})$/)) {
            throw Error('isbn is not valid');
        }
    }

    function validateStringIsEmptyOrNull(str) {
        if (str === null || str === '') {
            throw Error('str cannot be empty or null');
        }
    }

    class Item {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this.id = getNextId();
        }

        get name() {
            return this._name;
        }
        set name(name) {
            validateStringLenght(name, 2, 40);
            this._name = name;
        }

        get description() {
            return this._description;
        }
        set description(description) {
            validateStringIsNull(description);
            this._description = description;
        }

        get id() {
            return this._id;
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
            super(name, description);
            this.isbn = isbn;
            this.genre = genre;
        }

        get isbn() {
            return this._isbn;
        }
        set isbn(value) {
            validateNumberIsbn(value);
            this._isbn = value;
        }

        get genre() {
            return this._genre;
        }
        set genre(value) {
            validateNumberRange(value, 2, 20);
            this._genre = value;
        }

    }
    class Media extends Item {

        constructor(name, rating, duration, description) {
            super(name, description);
            this.rating = rating;
            this.duration = duration;
        }

        get rating() {
            return this._rating;
        }
        set rating(value) {
            validateNumberRange(value, 1, 5);
            this._rating = value;
        }

        get duration() {
            return this._duration;
        }
        set duration(value) {
            validateNumberRange(value, 0, Number.MAX_SAFE_INTEGER);
            this._duration = value;
        }
    }

    class Catalog {
        constructor(name) {
            this._id = getNextId();
            this.name = name;
            this._items = [];
        }

        get name() {
            return this._name;
        }
        set name(value) {
            validateNumberRange(value, 2, 40);
            this._name = value;
        }

        get id() {
            return this._id;
        }

        get items() {
            return this._items;
        }

        add(...items) {
            if (Array.isArray(items[0])) {
                this._items = items[0];
            }

            if (items === null) {
                throw Error('At least one item')
            }

            items.forEach(item => {
                if (typeof(item) !== 'object') {
                    throw Error('item must be object');
                }

                validateStringLenght(item.name, 2, 40);
                validateNumberRange(item.id, 0, Number.MAX_SAFE_INTEGER);
                validateStringIsNull(item.description);
            });

            this._items.push(...items);
            // items.forEach(item => this._items.push(item));

            return this;
        }

        find(arg) {
            if (typeof arg === 'object') {
                return findByOption.call(this, arg);
            }
            return findById.call(this, arg)

            function findById(id) {
                if (typeof id !== 'number') {
                    throw Error('id must be a number');
                }

                return this._items.find(item => item.id === id) || null;
            }

            function findByOption(option) {
                return this._items.filter(item => {
                    return (
                        (option.name === item.name && option.id === item.id));
                });
            }

            /*function findByOptions(options) {      //Cuki's solution
				return this._items.filter(item => {
					return (
						(!options.hasOwnProperty('name') || item.name === options.name)
					 && (!options.hasOwnProperty('id') || item.id === options.id));
				});
			}*/
        }
        search(pattern) {
            validateStringIsEmptyOrNull(pattern);

            return this._items.filter(item => {
                return (item.name.indexOf('pattern') >= 0 ||
                    item.description.indexOf('pattern') >= 0)
            });
        }
    }

    return {
        getBook: function(name, isbn, genre, description) {
            //return a book instance
            return new Book(name, isbn, genre, description);
        },
        getMedia: function(name, rating, duration, description) {
            // return a media instance
            return new Media(name, rating, duration, description)
        },
        getBookCatalog: function(name) {
            // return a book catalog instance
        },
        getMediaCatalog: function(name) {
            // return a media catalog instance
        }
    };
}

module.exports = solve;