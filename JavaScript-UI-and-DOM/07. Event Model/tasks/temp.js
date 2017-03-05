/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/

function solve() {
    return function(selector) {
        let Validator,
            selectedElements;
        Validator = {
            validateIdReturnTrue(selector) {
                if (typeof selector === 'string') {
                    return true;
                }

                return false;
            },

            validateSelectorExist(selector) {
                if (typeof selector !== 'string' && selector.nodeType != 1) {
                    throw new Error('selector cannot be null!');
                }
            }
        };
        Validator.validateSelectorExist(selector);

        if (Validator.validateIdReturnTrue(selector)) {

            selectedElements = document.getElementById(selector);
            if (!selectedElements) {
                throw new Error('Element not exist!');
            }
        } else {

            selectedElements = selector;
        }

        let buttons = selectedElements.getElementsByClassName('button');
        //let contents = selectedElements.getElementsByClassName('content');

        buttons = [].forEach.call(buttons, x => x.textContent = 'hide');

        //for (let i = 0, len = buttons.length; i < len; i += 1) {  //Work
        //    buttons[i].innerHTML = 'hide';
        //}

        selectedElements.addEventListener('click', onClickEl, false);

        function onClickEl(ev) {
            let nextEl,
                clickedButton;

            if (ev.target.className === 'button') {

                clickedButton = ev.target;
                //nextEl = clickedButton.nextElementSibling;
                if (clickedButton.nextElementSibling.className != 'content') {
                    nextEl = ev.target.nextElementSibling;
                    nextEl = nextEl.nextElementSibling;
                } else {
                    nextEl = ev.target.nextElementSibling;
                }

                //console.log(nextEl.className);
                if (nextEl.className == 'content' && nextEl.nextElementSibling.className == 'button') {
                    if (nextEl.style.display != 'none') {
                        nextEl.style.display = 'none';
                        clickedButton.innerHTML = 'show';
                    }
                } else {
                    nextEl.style.display = '';
                    clickedButton.innerHTML = 'hide';
                }
            }
        };
    };
};

module.exports = solve;