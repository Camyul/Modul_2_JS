const db = [{
        id: 1,
        username: 'cuki',
        password: 'linux',
    },
    {
        id: 2,
        username: 'pepi',
        password: '123',
    },
];

module.exports = {
    findById(id) {
        const user = db.find((x) => x.id === id);

        return Promise.resolve(user);
    },
    findByUsername(username) {
        const user = db.find((x) => x.username === username);

        return Promise.resolve(user);
    },
};
