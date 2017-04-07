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
        let popup = document.getElementsByClassName('popup');
        return popup;
    };

    function makeElementVisible(domElement) {
        console.log(domElement);
        domElement.className += ' visible';
    };

    promise
        .then(makeElementVisible);

}());