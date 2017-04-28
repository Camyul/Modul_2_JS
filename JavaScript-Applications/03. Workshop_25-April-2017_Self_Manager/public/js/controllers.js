var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            home() {

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
                                console.log('tmp loaded');
                                let templateFunc = handlebars.compile(templateHtml);
                                let html = templateFunc();
                                $('#container').html(html);
                            });

                        $('#btn-login').on('click', (ev) => {
                            let user = {
                                username: $('tb-username').val(),
                                passHash: $('tb-password').val()
                            }

                            dataService.login(user)
                                .then((respUser) => {
                                    $(document.body).addClass('logged-in');
                                    window.location.replace('#/home');
                                });

                            ev.preventDefault;
                            return false;
                        });



                    });
            },

            addTodo() {

            },

            addEvent() {

            }
        }
    }
}