// const express = require('express');
const { Router } = require('express');
const router = new Router();
const passport = require('passport');
passport.use('../config/passport');

// const app = express();

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
            res.status(200)
                .send(`Welcome, ${user.username} <a href="/">Home</a>`);
        }
    })
    .get('/unautorized', (req, res) => {
        res.status(200).send('<h1>Wa Wa!</h1>');
    });

module.exports = (app) => app.use(router);
