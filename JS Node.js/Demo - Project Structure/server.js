const async = () => {
    return Promise.resolve();
};


async().then(() => require('./db').init())
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(3001, () => console.log('It Works at: 3001'));
    });
