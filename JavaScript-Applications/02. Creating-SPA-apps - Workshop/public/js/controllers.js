var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            home() {
                var cookies;
                dataService.cookies()
                    .then((cookiesResponse) => {
                        cookies = cookiesResponse;
                        console.log(cookies);

                        return templates.get('home');
                    })
                    .then((templateHtml) => {
                        let templateFunk = handlebars.compile(templateHtml),
                            html = templateFunk(cookies);

                        $('#container').html(html);

                        $('.btn-like-dislike').on('click', function(ev) {
                            let type = $('this').attr('data-type'),
                                cookieId = $('this').parents('li').attr('data-id');

                            console.log(type);
                            console.log(cookieId);
                            dataService.rateCookie(cookieId, type)
                                .then(); //Someting...
                        });
                    });
            },

            myCookie() {
                console.log('My Cookie');
            },

            addCookie() {
                templates.get('cookie-add')
                    .then((templateHtml) => {
                        let templateFunk = handlebars.compile(templateHtml),
                            html = templateFunk(cookies);

                        $('#container').html(html);

                        $('btn-add').on('click', () => {
                            var cookie = {
                                text: $("#tb-text").val(),
                                img: $("#tb-img-url").val(),
                            };

                            dataService.addCookie(cookie)
                                .then(() => {
                                    window.location('#/home')
                                });
                        });
                    });
            },

            login() {
                dataService.isLoggedIn()
                    .then(isLoggedIn => {
                        if (isLoggedIn) {
                            window.location('#/home');
                            return;
                        }

                        templates.get('login')
                            .then((templateHtml) => {
                                let templateFunk = handlebars.compile(templateHtml),
                                    html = templateFunk();

                                $('#container').html(html);

                                $('btn-login').on('click', (ev) => {
                                    let user = {
                                        username: $('tb-username').val(),
                                        passHash: $('tb-password').val()
                                    };
                                    dataService.login(user)
                                        .then((respUser) => {
                                            $(document.body).addClass('logged-in');
                                            window.location('#/home');
                                        });

                                    ev.preventDafault();

                                    return false;
                                });

                                $('btn-register').on('click', (ev) => {
                                    let user = {
                                        username: $('tb-username').val(),
                                        passHash: $('tb-password').val()
                                    };

                                    dataService.register(user)
                                        .then((respUser) => {
                                            $(document.body).addClass('logged-in');
                                            window.location('#/home');
                                        });

                                    ev.preventDafault();

                                    return false;
                                });

                            });
                    });
            }

        };
    }
};