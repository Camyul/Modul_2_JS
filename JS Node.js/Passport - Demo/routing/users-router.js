// const express = require('express');
const { Router } = require('express');
const router = new Router();
const passport = require('passport');
// passport.use('../config/passport');
const createAuthController = require('../controller/auth-controller');
const createUsersController = require('../controller/users-controller');
const data = require('../dimmy-db');

// const app = express();

const authController = createAuthController(data);
const usersController = createUsersController(data);

router
    .get('/login', usersController.login)
    .get('/', usersController.home)
    .post('/login', authController.login)
    .get('/login/github', passport.authenticate('github', { scope: 'user' }))
    .get('/login/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        (req, res) => res.redirect('/profile'))
    .get('/register', usersController.getRegister)
    .post('/register', authController.register)
    .get('/profile', usersController.profile)
    .get('/unautorized', usersController.unauthorized);

module.exports = (app) => app.use(router);
