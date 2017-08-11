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

        return requester.postJSON('/api/todos', todo, options)
            .then((resp) => {
                return resp.result;
            });
    },

    todosGet() {
        var options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };

        return requester.getJSON('/api/todos', options)
            .then((res) => {
                return res.result;
            })
    },

    todosUpdate(id, todo) {
        var options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };

        return requester.putJSON('/api/todos' + id, todo, options)
            .then((res) => {
                return res.result;
            })()
    },

    addEvents(event) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };

        return requester.postJSON('/api/events', event, options)
            .then((resp) => {
                return resp.result;
            });
    },

    eventsGet() {
        var options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };

        return requester.getJSON('/api/events', options)
            .then((res) => {
                return res.result;
            })
    },

    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("username");
            });
    },

    login(user) {
        return requester.putJSON('/api/users/auth', user)
            .then((resp) => {
                var user = resp.result;
                localStorage.setItem('username', user.username);
                localStorage.setItem('authKey', user.authKey);
                return {
                    username: resp.result.username
                };
            });
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