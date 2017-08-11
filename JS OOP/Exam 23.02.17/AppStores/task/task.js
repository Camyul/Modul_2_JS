function solve() {

    const Validator = {
        validateStringLength(str, min, max) {
            if (str.length < min || str.length > max) {
                throw new Error('Invalid String Length');
            }
        },

        validateOnlyLatin(str) {
            if (str.match(/[^A-Za-z ]/)) {
                throw new Error('Can contain only latin symbols and whitespaces!');
            }
        },

        validateStringExist(str) {
            if (str === null || typeof str !== 'string') {
                throw new Error('Must be string!');
            }
        },

        validateNumberBiggestOfZero(num) {
            if (typeof num !== 'number' || num < 0 || Number.isNaN(num)) {
                throw new Error(`Nevalid Number`);
            }
        },

        validateRatingBetween1_10(num) {
            if (typeof num !== 'number' || num < 1 || num > 10 || Number.isNaN(num)) {
                throw new Error(`Nevalid Rating`);
            }
        },

        validateIstance(properties, unit) {

            properties.forEach(p => {
                if (typeof unit[p] === 'undefined') {
                    throw new Error(`Wrong Istance!`);
                }
            });
        }
    }

    class App {
        constructor(name, description, version, rating) {
            this.name = name;
            this.description = description;
            this.version = version;
            this.rating = rating;
        }

        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateStringLength(name, 1, 24);
            Validator.validateOnlyLatin(name);
            Validator.validateStringExist(name);

            this._name = name;
        }

        get description() {
            return this._description;
        }
        set description(description) {
            Validator.validateStringExist(description);

            this._description = description;
        }

        get version() {
            return this._version;
        }
        set version(version) {
            Validator.validateNumberBiggestOfZero(version);

            this._version = version;
        }

        get rating() {
            return this._rating;
        }
        set rating(rating) {
            Validator.validateRatingBetween1_10(rating);

            this._rating = rating;
        }

        release(opt) {
            if (typeof opt === 'number') {
                if (opt <= this.version) {
                    throw new Error('The Viersion is lower from actual');
                }

                this.version = opt;
            } else {

                if (opt.hasOwnProperty('version')) {
                    if (opt.version <= this.version) {
                        throw new Error('The Viersion is lower from actual');
                    }

                    this.version = opt.version;
                }

                if (opt.hasOwnProperty('description')) {
                    this.description = description;
                }

                if (opt.hasOwnProperty('rating')) {
                    this.rating = rating;
                }
            }
            return this;
        }
    }

    class Store extends App {
        constructor(name, description, version, rating) {
            super(name, description, version, rating);

            this.apps = [];
        }

        uploadApp(app) {
            Validator.validateIstance(['name', 'description', 'version', 'rating'], app);

            let findName = this.apps.find(a => a.name === app.name);

            if (findName === undefined) {
                this.apps.push(new App(name, description, version, rating));
            } else {
                findName.release(app); //Не знам дали бачка!!!
            }

            return this;
        }

        takedownApp(name) {
            Validator.validateStringExist(name);

            let findName = this.apps.findIndex(a => a.name === name);

            if (findName === -1) {
                throw new Error('App with this name not exist');
            } else {
                this.apps.splice(findIndex, 1);
            }

            return this;
        }

        search(pattern) { //Work???
            Validator.validateStringExist(pattern);

            return this.apps.filter(item => {
                return (
                    item.name.toLowerCase().indexOf(pattern) >= 0)
            });

            /*return this.apps
                .map(a => a.name.toLowerCase()
                    .filter(n => n.name.includes(pattern))
                    .sort(x => x.name));*/
        }

        listMostRecentApps(count) {
            if (count === null) {
                count = 10;
            } else {
                Validator.validateNumberBiggestOfZero(count);


            }

            return this;
        }

        listMostPopularApps(count) {
            /*let filteredApps = [],
                sortedByRating = this.apps
				.sort((x, y) => y.rating - x.rating);
				

            if (count === null) {
                count = 10;
            } else {
                Validator.validateNumberBiggestOfZero(count);
            }

            for (let i = 0; i < count; i += 1) {
                filteredApps.push(sortedByRating[i]);
            }

            return filteredApps;*/
            if (count === null) {
                count = 10;
            } else {
                Validator.validateNumberBiggestOfZero(count);
            }

            return this.apps
                .sort((x, y) => y.rating - x.rating)
                .slice(0, count);


        }
    }

    class Device {
        constructor(hostname, apps) {

            this.hostname = hostname;
            this.apps = apps;
        }

        get hostname() {
            return this._hostname;
        }
        set hostname(hostname) {
            Validator.validateStringLength(hostname, 1, 32);
            Validator.validateOnlyLatin(hostname);
            Validator.validateStringExist(hostname);

            this._hostname = hostname;
        }

        get apps() {
            return this._apps;
        }
        set apps(apps) {
            if (apps === null || apps === [] || !Array.isArray(apps)) {
                throw new Error('Missing Apps');
            } else {
                for (let i = 0, len = apps.length; i < len; i += 1) {
                    if (apps[i].hasOwnProperty('apps')) {
                        Validator.validateIstance(['name', 'description', 'version', 'rating'], apps[i].apps);
                    } else {
                        Validator.validateIstance(['name', 'description', 'version', 'rating'], apps[i]);
                    }
                }

            }

            this._apps = apps;
        }

        search(pattern) {
            let searchedApps = [];

            Validator.validateStringExist(pattern);

            for (let i = 0, len = this.apps.length; i < len; i += 1) {

                searchedApps.push(this.apps.filter(item => {
                    return (
                        item.name.toLowerCase().indexOf(pattern) >= 0)
                }));

            }

            searchedApps.map((x => x.name.toLowerCase())
                .sort((x, y) => {
                    if (x.name === y.name) {
                        return y.version - x.version
                    }
                    return x.name;
                })
                .filter((name, index, names) => name !== names[index - 1]));

            return searchedApps;
        }

        install(name) {
            let findedApp = [];
            Validator.validateStringExist(name);


            findedApp = this.apps.apps.find(x => x.name === name);
            if (findedApp === []) {
                throw new Error('App is not Instaled');
            }

            this.apps.push(findedApp);

            return this;
        }

        uninstall(name) {
            let findedApp = [];
            Validator.validateStringExist(name);


            findIndex = this.apps.findIndex(x => x.name === name);
            if (findIndex === -1) {
                throw new Error('App is not Instaled');
            }

            this.apps.splice(findIndex, 1);

            return this;
        }

        listInstalled() {

            return this.apps
                .sort(x => x.name)
                .filter((name, index, names) => name !== names[index - 1]);
        }

        update() {

            return this;
        }
    }

    return {
        createApp(name, description, version, rating) {
            // returns a new App object

            return new App(name, description, version, rating);
        },
        createStore(name, description, version, rating) {
            // returns a new Store object

            return new Store(name, description, version, rating);
        },
        createDevice(hostname, apps) {
            // returns a new Device object

            return new Device(hostname, apps);
        }
    };
}

// Submit the code above this line in bgcoder.com
module.exports = solve;