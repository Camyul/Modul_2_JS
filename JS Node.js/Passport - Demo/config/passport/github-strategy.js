const GithubStrategy = require('passport-github2');

const GITHUB = {
    CLIENT_ID: '30721b93d9.....-GetFromGitHub',
    CLIENT_SECRET: '57cdaf5af1cb2d1a...-GetFromGitHub',
    callbackURL: 'http://127.0.0.1:3001/login/github/callback',
};

module.exports = (passport, data) => {
    const authStrategy = new GithubStrategy({
            clientID: GITHUB.CLIENT_ID,
            clientSecret: GITHUB.CLIENT_SECRET,
            callbackUrl: GITHUB.callbackURL,
        },
        function(accessToken, refreshToken, profile, done) {
            data
                .findByGithubId(profile.id)
                .then((user) => {
                    if (user) {
                        return user;
                    } else {
                        return data.createUser({
                            username: profile.username,
                            github_id: profile.id,
                        });
                    }
                })
                .then((user) => {
                    done(null, user);
                })
                .catch((error) => done(error, false));
        }
    );
    passport.use(authStrategy);
};
