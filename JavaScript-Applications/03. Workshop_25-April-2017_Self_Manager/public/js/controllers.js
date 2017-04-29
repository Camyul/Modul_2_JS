var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            home() {
                templates.get('home')
                    .then((html) => {
                        $('#container').html(html);
                    })

                // Add List of TODOS and Events
            },
            login() {
                dataService.isLoggedIn()
                    .then(isLoggedIn => {
                        if (isLoggedIn) {
                            window.location.replace('#/home')
                            return;
                        }

                        templates.get('login')
                            .then((templateHtml) => {
                                let templateFunc = handlebars.compile(templateHtml);
                                let html = templateFunc();
                                $('#container').html(html);

                                $("#btn-login").on("click", (ev) => {


                                    let user = {
                                        username: $('#tb-username').val(),
                                        passHash: $('#tb-password').val()
                                    }

                                    dataService.login(user)
                                        .then((respUser) => {
                                            $(document.body).addClass('logged-in');
                                            window.location.replace('#/home');
                                        });

                                    ev.preventDefault;
                                    return false;
                                });

                                $('#btn-register').on('click', (ev) => {
                                    let user = {
                                        username: $('#tb-username').val(),
                                        passHash: $('#tb-password').val()
                                    }

                                    dataService.register(user)
                                        .then((respUser) => {
                                            return dataService.login(user);
                                        })
                                        .then((respUser) => {
                                            $(document.body).addClass('logged-in');
                                            window.location.replace('#/home');
                                        });

                                    ev.preventDefault;
                                    return false;
                                });
                            });
                    });
            },

            addTodo() {
                dataService.isLoggedIn()
                    .then(isLoggedIn => {


                        templates.get('todos')
                            .then((templateHtml) => {
                                //let templateFunc = handlebars.compile(templateHtml);
                                //let html = templateFunc();
                                $('#container').html(templateHtml);
                            });
                    });
                $('#btn-add-todo').on('click', (ev) => {
                    console.log('event');
                    let todo = {
                        name: $('#tb-name-todo').val(),
                        category: $('#tb-category-todo').val(),
                        status: $('#todo-status :selected').text()
                    }
                    console.log(todo);
                    dataService.addTodo(todo)
                        .then((todo) => {
                            toastr.success(`TODO "${todo.text}" added!`);
                            console.log('Todo added');
                        })

                    ev.preventDefault;
                    return false;
                });
            },

            addEvent() {

            }
        }
    }
}