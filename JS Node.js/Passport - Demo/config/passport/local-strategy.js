const LocalStrategy = require('passport-local');
const data = require('../../dimmy-db');

const authStrategy = new LocalStrategy((username, password, done) => {
    data.findByUsername(username)
        .then((user) => {
            if (user && user.password === password) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch((error) => done(error, false));
});

module.exports = (passport) => passport.use(authStrategy);
