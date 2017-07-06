const passport = require('passport');
const data = require('../../dimmy-db');

passport.serializeUser((user, done) => {
    if (user) {
        done(null, user.id);
    }
});

passport.deserializeUser((userId, done) => {
    data
        .findById(userId)
        .then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch((error) => done(error, false));
});

require('./local-strategy')(passport);

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};
