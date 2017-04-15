import { data } from './data.js';

$(() => {
    console.log(data);
    dataP = JSON.parse(data);
    let $img = $('img /');
    $img.src = dataP.data.url;

    $('section').append(img);
})