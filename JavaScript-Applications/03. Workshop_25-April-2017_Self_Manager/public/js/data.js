const HTTP_HEADER_KEY = "x-auth-key",
    KEY_STORAGE_USERNAME = "username",
    KEY_STORAGE_AUTH_KEY = "authKey";


let dataService = {
    addTodo(todo) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };

        return requester.postJSON('/api/todos', todo, options);
    },

    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("username");
            });
    },

    login(user) {
        return requester.putJSON('/api/users/auth', user)
            .then(() => {
                localStorage.setItem('username', user.username);
                localStorage.setItem('authKay', user.passHash)
            })
    },

    register(user) {
        return requester.postJSON('/api/users', user);
    },

    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem('username');
                localStorage.removeItem('authKay');
            })
    }

}