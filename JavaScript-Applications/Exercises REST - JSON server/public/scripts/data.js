//https://jsonplaceholder.typicode.com/

var dataJSON = (function() {
    let root = 'https://jsonplaceholder.typicode.com';
    //add in promise
    const promise = new Promise((resolve, reject) => {
            $.getJSON(root + '/photos')
                .done(resolve)
                .fail(reject)
        })
        .then(function(data) {
            console.log(data[0].url);
            let img = document.createElement('img');
            img.src = data[0].thumbnailUrl;
            $('.body').append(img);
        });
    return data;
})();


export { dataJSON };