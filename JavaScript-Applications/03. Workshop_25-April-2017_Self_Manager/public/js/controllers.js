var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            home() {
                templates.get('home')
                    .then((html) => {
                        $('#container').html(html);

                        $('#btn-todos').on('click', (ev) => {
                            templates.get('todos-list')
                                .then((templateHtml) => {
                                    dataService.todosGet()
                                        .then((todos) => {
                                            let templateFunc = handlebars.compile(templateHtml);
                                            let html = templateFunc(todos);

                                            $('#container').html(html);

                                            /*$('.todo-box').on('change', () => {
                                                var checkbox = $(this).find('input'),
                                                    isChecked = $checkbox.prop('checked'),
                                                    id = $(this).attr('data-id');
                                                console.log($checkbox);
                                                console.log(isChecked);
                                                console.log(id);
                                                debugger;
                                                dataService.todosUpdate(id, {
                                                    state: isChecked
                                                }).then((todo) => {
                                                    toastr.success(`TODO "${todo.text}" Updated!`);
                                                })
                                            });*/
                                        });
                                });
                        });

                        $('#btn-events').on('click', (ev) => {
                            templates.get('events-list')
                                .then((templateHtml) => {
                                    dataService.eventsGet()
                                        .then((events) => {
                                            let templateFunc = handlebars.compile(templateHtml);
                                            let html = templateFunc(events);

                                            $('#container').html(html);
                                        });
                                });
                        });
                    });
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
                                            toastr.success(`User "${respUser.username}" Success loged!`);
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
                                            toastr.success(`User "${respUser.username}" Success registered!`);
                                        });

                                    ev.preventDefault;
                                    return false;
                                });
                            });
                    });
            },

            addTodo() {
                dataService.isLoggedIn()
                    .then((isLoggedIn) => {
                        templates.get('todos')
                            .then((templateHtml) => {
                                //let templateFunc = handlebars.compile(templateHtml);
                                //let html = templateFunc();
                                $('#container').html(templateHtml);

                                $('#btn-add-todo').on('click', (ev) => {
                                    let todo = {
                                        text: $('#tb-name-todo').val(),
                                        category: $('#tb-category-todo').val()
                                    }

                                    dataService.addTodo(todo)
                                        .then((todo) => {
                                            window.location.replace('#/home');
                                            toastr.success(`TODO "${todo.text}" added!`);
                                        })

                                    ev.preventDefault;
                                    return false;
                                });
                            });
                    });

            },

            addEvent() {
                dataService.isLoggedIn()
                    .then((isLoggedIn) => {
                        templates.get('event')
                            .then((templateHtml) => {
                                $('#container').html(templateHtml);

                                $('#btn-event-add').on('click', (ev) => {
                                    let user = $('#tb-event-users').val(),
                                        users = (!!user.trim()) ? [user] : [];

                                    let event = {
                                        title: $('#tb-event-title').val(),
                                        category: $('#tb-event-category').val(),
                                        description: $('#tb-event-description').val(),
                                        date: $('#tb-event-date').val() + ' ' + $('#tb-event-time').val(),
                                        users: users
                                    }

                                    dataService.addEvents(event)
                                        .then((event) => {
                                            window.location.replace('#/home');
                                            toastr.success(`Event "${event.title}" success added!`);
                                        })

                                    ev.preventDefault;
                                    return false;
                                });
                            });
                    });
            }
        }
    }
}