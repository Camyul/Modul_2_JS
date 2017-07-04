const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');

const configAuth = (app, { users }) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findByUsername(username)
                .then((user) => {
                    if (user.password !== password) {
                        done(new Error('Invalid password'));
                    }

                    return done(null, user);
                })
                .catch((err) => {
                    return done();
                });
        }
    ));

    app.use(cookieParser());
    app.use(session({ secret: 'Purple Unicorn' }));
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(app.router);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                console.log(user);
                done(null, user);
            })
            .catch(done);
    });

    app.use((req, res, next) => {
        res.locals = res.locals || {};

        res.locals.user = req.user;
        next();
    });
};

module.exports = configAuth;
