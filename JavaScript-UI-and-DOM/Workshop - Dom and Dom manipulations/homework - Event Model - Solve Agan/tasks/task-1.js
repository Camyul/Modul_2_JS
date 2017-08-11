/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/

function solve() {
    return function(selector) {
        let buttons,
            contents,
            element = selector;

        if (typeof element === 'string') {
            element = document.getElementById(element);
        }

        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement or selector');
        }

        buttons = element.getElementsByClassName('button');
        contents = element.getElementsByClassName('content');

        [].slice.apply(buttons).forEach(x => x.innerHTML = 'hide');

        element.addEventListener('click', onButtonClick, false);


        function onButtonClick(ev) {
            let clickedButton = ev.target,
                nextElement = clickedButton.nextElementSibling;

            /* if (nextElement.clasName !== 'content') {
                 nextElement = nextElement.nextElementSibling;
             }*/

            if (clickedButton.innerHTML === 'hide') {
                ev.target.innerHTML = 'show';
                nextElement.style.display = 'none';
            } else {
                ev.target.innerHTML = 'hide';
                nextElement.style.display = '';
            }
        };
    };
};

module.exports = solve;