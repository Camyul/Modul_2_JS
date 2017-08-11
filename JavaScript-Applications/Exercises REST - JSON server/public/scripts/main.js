import { dataJSON as data } from './data.js';


data.then(() => { //don't work, get undefined data
    console.log(data[10].url);
    let $img = $('img');
    $img.src = data[10].url;
    //console.log($img.src);
    $('.body').append($img)
});