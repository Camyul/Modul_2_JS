function solve() {

    function* getID() {
        let id = 0;
        while (true) {
            id += 1;
            yield id
        }
    }

    //Търси в масив, елемент с пропърти с 
    // определена стойност - връща индекса или -1
    function findWithAttr(array, attr, value) {

        let i,
            len;

        for (i = 0, len = array.length; i < len; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
            return -1;
        }
    }

    const generatorID = getID();

    const Validator = {
        validateString3_25(str) {
            if (str.length < 3 || str.length > 25) {
                throw new Error(`Invalid String Length`);
            }
        },

        validateIntegerBiggestOfZero(num) {
            if (typeof num !== 'number' || num < 0 || Number.isNaN(num)) {
                throw new Error(`Nevalid Number`);
            }
        },

        validateRatingBetween1_5(num) {
            if (typeof num !== 'number' || num < 1 || num > 5 || Number.isNaN(num)) {
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

    class Player {
        constructor(name) {
            this.name = name;
            this.playlists = [];
        }

        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateString3_25(name);

            this._name = name;
        }

        addPlaylist(playlistToAdd) {
            Validator.validateIstance(['name', 'id'], playlistToAdd);

            this.playlists.push(playlistToAdd);

            return this;
        }
        getPlaylistById(id) {
            let findedPlayList = this.playlists.find(p => p.id === id);

            if (typeof findedPlayList === 'undefined') {
                return null;
            }

            return this;
        }

        removePlaylist(opt) {
            let findId;
            if (typeof opt !== 'number') {
                findId = opt.id;
            }

            let index = findWithAttr(this.playlists, id, findId);

            if (index === -1) {
                throw new Error(`Playlist with ID ${id} not found`);
            }

            this.playlists.splice(i, 1);
            return this;
        }

        listPlaylists(page, size) {
            let len = this.playlists.length,
                i,
                result = [];
            Validator.validateIntegerBiggestOfZero(page);
            Validator.validateIntegerBiggestOfZero(size);

            if (len < page * size) {
                throw new Error(`Playlist is smallest`);
            }

            for (i = page * size; i < len; i += 1) {
                result.push(this.playlists[i]);
            }

            return result;
        }

        contains(playable, playlist) {
            return this;
        }

        search(pattern) {
            let searched = this.playlists.playable
                .map(x => x.title.toLowerCase()) //към малки букви
                .filter(p => p.title.contains(pattern)) //избираме които отговарят
                .map(y => { //нов масив с обекти, които съдътжат определени пропертита
                    name: y.name;
                    id: y.id
                });

            return searched;
        }
    }

    class Playlist {
        constructor(name) {
            this.name = name;
            this._id = generatorID.next().value;
            this.playable = [];
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }
        set name(name) {
            Validator.validateString3_25(name);

            this._name = name;
        }

        addPlayable(playable) {
            return this;
        }

        getPlayableById(id) {
            return this;
        }

        removePlayable(id) {
            return this;
        }

        removePlayable(playable) {
            return this;
        }

        listPlayables(page, size) {
            return this;
        }
    }

    class Playable {
        constructor(title, author) {
            this._id = generatorID.next().value;
            this.title = title;
            this.author = author;
        }

        get id() {
            return this._id;
        }

        get title() {
            return this._title;
        }
        set title(title) {
            Validator.validateString3_25(title);

            this._title = title;
        }

        get author() {
            return this._author;
        }
        set author(author) {
            Validator.validateString3_25(author);

            this._author = author;
        }

        play() {
            return `[${this.id}]. [${this.title}] - [${this.author}]`;
        }
    }

    class Audio extends Playable {
        constructor(title, author, length) {
            super(title, author);

            this.length = length;
        }

        get length() {
            return this._length;
        }
        set length(length) {
            Validator.validateIntegerBiggestOfZero(length);

            this._length = length;
        }

        play() {
            let playString = super.play();
            playString += ` - [${this.length}]`;

            return playString;
        }
    }

    class Video extends Playable {
        constructor(title, author, imdbRating) {
            super(title, author);

            this.imdbRating = imdbRating;
        }

        get imdbRating() {
            return this._imdbRating;
        }
        set imdbRating(imdbRating) {
            Validator.validateRatingBetween1_5(imdbRating);

            this._imdbRating = imdbRating;
        }

        play() {
            let playString = super.play();
            playString += ` - [${this.imdbRating}]`;

            return playString;
        }
    }

    const module = {
        getPlayer: function(name) {
            // returns a new player instance with the provided name

            return new Player(name);

        },
        getPlaylist: function(name) {
            //returns a new playlist instance with the provided name

            return new Playlist(name);
        },
        getAudio: function(title, author, length) {
            //returns a new audio instance with the provided title, author and length

            return new Audio(title, author, length);
        },
        getVideo: function(title, author, imdbRating) {
            //returns a new video instance with the provided title, author and imdbRating

            return new Video(title, author, imdbRating)
        }
    };

    return module;
}

module.exports = solve;