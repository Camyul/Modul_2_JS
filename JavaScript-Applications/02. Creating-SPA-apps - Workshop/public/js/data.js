const HTTP_HEATHER_KEY = 'x-auth-key',
    KEY_STORAGE_USERNAME = 'username',
    KEY_STORAGE_AUTH_KEY = 'authKey';

var dataService = {

    cookies() {
        return requester.getJSON('/api/cookies');
    },

    addCookie(cookie) {
        let options = {
            headers: {
                [HTTP_HEATHER_KEY]: localStorage.getJSON('KEY_STORAGE_AUTH_KEY')
            }
        };

        return requester.postJSON('/api/cookies', cookie, options);
    },

    rateCookie(cookieId, type) {
        let options = {
            headers: {
                [HTTP_HEATHER_KEY]: localStorage.getJSON('KEY_STORAGE_AUTH_KEY')
            }
        };

        return requester.putJSON('/api/cookies' + cookieId, { type }, options);
    },

    login() {
        return requester.putJSON('/api/auth', user)
            .then((respUser) => {
                localStorage.setItem('username', respUser.result.username);
                localStorage.setItem('authKey', respUser.result.authKey);
            });
    },

    register(user) {
        return requester.postJSON('/api/users', user);
    },

    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem('username');
                localStorage.removeItem('authKey');
            });
    },

    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem('username');
            });
    }
};