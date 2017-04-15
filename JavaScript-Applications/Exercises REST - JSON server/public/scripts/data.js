//https://jsonplaceholder.typicode.com/

var data = (function() {
    let root = 'https://jsonplaceholder.typicode.com';
    //add in promise
    $.ajax({
        url: root + '/posts',
        method: 'GET'
    }).then(function(data) {
        console.log(data);
    });
})();

export { data };