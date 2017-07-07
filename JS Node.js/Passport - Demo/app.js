const PORT = 3001;

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const data = require('./dimmy-db');
// const { Router } = require('express');

const app = express();

// app middlewares for sessions
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'Purple unicorn' }));

// passport setup
/* const authStrategy = new LocalStrategy((username, password, done) => {
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

passport.use(authStrategy);*/

// session serialization
/* passport.serializeUser((user, done) => {
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
});*/

// attach passport middware to app
/* app.use(passport.initialize());
app.use(passport.session());*/

// attach routers
/* const router = new Router();

router
    .get('/login', (req, res) => {
        res.status(200).send(`
    <form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
    `);
    })
    .get('/', (req, res) => res.status(200).send(`
    <h1>Home</h1>
    <h2>${req.user ? req.user.username : 'Not Logged'}</h2>
    `))
    .post('/login',
        passport.authenticate('local', { failureRedirect: '/unautorized' }),
        (req, res) => res.status(200).redirect('./profile'))
    .get('/profile', (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/unautorized');
        } else {
            const user = req.user;
            res.status(200).send(`Welcome, ${user.username} <a href="/">Home</a>`);
        }
    })
    .get('/unautorized', (req, res) => {
        res.status(200).send('<h1>Wa Wa!</h1>');
    });

app.use(router);*/

app.listen(PORT, () => console.log(`Magic happening at http://localhost:${PORT}`));
