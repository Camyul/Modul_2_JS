module.exports = (data) => {
    return {
        home(req, res) {
            res.status(200).send(`
    <h1>Home</h1>
    <a href="/login">Sign In</a>
    <a href="/register">Sign Up</a>
    <h2>${req.user ? req.user.username : 'Not Logged'}</h2>
    `);
        },
        login(req, res) {
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
        },
        profile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/unautorized');
            } else {
                const user = req.user;
                res.status(200)
                    .send(`Welcome, ${user.username} <a href="/">Home</a>`);
            }
        },
        unauthorized(req, res) {
            res.status(200).send('<h1>Wa Wa! You are unauthorized</h1>');
        },
        getRegister(req, res) {
            res.status(200).send(`
    <form action="/register" method="POST">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Register"/>
    </div>
</form>
    `);
        },
    };
};
