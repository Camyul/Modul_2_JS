const passport = require('passport');

module.exports = (data) => {
    return {
        login: passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/unauthorized',
            failureFlash: true,
        }),
        logout(req, res) {
            req.logout();
            req.redirect('/');
        },
        register(req, res) {
            const user = {
                username: req.body.username,
                password: req.body.password,
            };
            console.log(user);
            data.createUser(user)
                .then((dbUser) => {
                    console.log(req.body);
                    res.status(201)
                        .send('<h1>Worked!</h1>');
                })
                .catch((error) => res.status(500).json(error));
        },
    };
};
