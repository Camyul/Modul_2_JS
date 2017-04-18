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
                                .then() //Someting...
                        });
                    });
            }
        };
    }
};