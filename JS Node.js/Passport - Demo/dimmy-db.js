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
    createUser(user) {
        const lastId = db[db.length - 1].id;

        user.id = lastId + 1;

        db.push(user);

        return Promise.resolve(user);
    },
    findByGithubId(githubId) {
        const user = db.find((x) => x.githubId === githubId);

        return Promise.resolve(user);
    },
};
