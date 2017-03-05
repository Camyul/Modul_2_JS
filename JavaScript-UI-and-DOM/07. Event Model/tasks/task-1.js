function solve() {
    return function(selector) {
        let container,
            buttons;

        if (typeof selector !== 'string' && selector.nodeType != 1) {
            throw new Error('Selector wrong type!');
        }

        if (typeof selector === 'string' || typeof selector === 'number') {
            container = document.getElementById(selector);

            if (!container) {
                throw new Error('Element not exist!');
            }

        } else {
            container = selector;
        }


        buttons = container.getElementsByClassName('button');

        [].forEach.call(buttons, x => x.innerHTML = 'hide');

        container.addEventListener('click', onButtonClick, false);

        function onButtonClick(ev) {
            let clickedButton,
                nextElement;


            if (ev.target.className === 'button') {
                clickedButton = ev.target;
                //nextElement = ev.target.nextElementSibling;

                if (clickedButton.nextElementSibling.className !== 'content') {
                    nextElement = ev.target.nextElementSibling;
                    nextElement = nextElement.nextElementSibling;
                } else {
                    nextElement = ev.target.nextElementSibling;
                }
                //console.log(nextElement);
                if (nextElement.className === 'content') {
                    if (nextElement.style.display !== 'none') {
                        nextElement.style.display = 'none';
                        clickedButton.innerHTML = 'show';
                    } else {
                        clickedButton.innerHTML = 'hide';
                        nextElement.style.display = '';
                    }
                }
            }
        };
    };
}

module.exports = solve;