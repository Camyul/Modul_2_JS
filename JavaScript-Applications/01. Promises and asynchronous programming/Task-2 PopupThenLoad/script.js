(function() {
    /*let promise = new Promise(function(resolve, reject) { //Work
        setTimeout(function() {
            window.location = 'http://www.google.com';
        }, 2000);
    });*/

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getDomElement());
        }, 1500);
    });

    function getDomElement() {
        let popup = document.getElementsByClassName('popup')[0];
        return popup;
    };

    function makeElementVisible(domElement) {
        console.log(domElement.className);
        domElement.className += ' visible';
    };

    function redirect() {
        setTimeout(function() {
            window.location = 'http://www.google.com';
        }, 2000);
    };

    promise
        .then(makeElementVisible)
        .then(redirect);

}());