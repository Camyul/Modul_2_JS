var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            home() {
                var cookies;
                dataService.cookies()
                    .then()
            }
        };
    }
};