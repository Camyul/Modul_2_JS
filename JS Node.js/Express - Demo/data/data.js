const usersList = [{
    id: 1,
    username: 'cuki',
    password: '123',
}, {
    id: 2,
    username: 'v',
    password: 'p',
}];

const users = {
    findById(id) {
        id = parseInt(id, 10);
        const user = usersList.find((u) => u.id === id);
        console.log(user);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user');
            }
            return resolve(user);
        });
    },
    findByUsername(username) {
        const userToLower = username.toLowerCase();
        const user =
            usersList.find((u) => u.username.toLowerCase === userToLower);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such pass');
            }
            return resolve(user);
        });
    },
};

module.exports = {
    users,
};
