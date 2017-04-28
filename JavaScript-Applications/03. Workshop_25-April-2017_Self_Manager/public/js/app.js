let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on('home', controllersInstance.home)
    .on('login', controllersInstance.login)
    .on('todos', controllersInstance.addTodo)
    .on('events', controllersInstance.addEvent)
    .on(() => {
        $('#main-nav .home a').addClass('active');
        router.navigate('home');
    })
    .resolve();

dataService.isLoggedIn()
    .then((isLoggedIn) => {
        if (isLoggedIn) {
            $(document.body).addClass('logged-in');
        }
    });

$('.btn-nav-logout').on('click', () => {
    dataService.logout()
        .then(() => {
            $(document.body).removeClass('logged-in');
        });
});