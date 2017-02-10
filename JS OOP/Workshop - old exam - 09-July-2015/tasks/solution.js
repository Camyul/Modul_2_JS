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
        if (num < 2 || num > 40) {
            throw Error("The number is not a valid!");
        }
    }

    function validateStringIsNull(str) {
        if (str === null) {
            throw Error('The string is Null');
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
    }

    return {
        getBook: function(name, isbn, genre, description) {
            // return a book instance
        },
        getMedia: function(name, rating, duration, description) {
            // return a media instance
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