class Data {
    constructor(db, ModelClass) {
        db.collection('');
    }

    getAll() {

    }

    create(model) {

    }
}

const init = (db) => {
    return {
        items: new Data(db, Item),
    };
};

module.exports = { init };
