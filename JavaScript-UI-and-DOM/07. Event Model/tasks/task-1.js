function solve() {
    return function(selector) {
        var i,
            domElement,
            allButtons,
            allButtonsLength,
            currButton;

        if (typeof selector !== 'string' && selector.nodeType != 1) {
            throw new Error();
        }

        if (typeof selector === 'string') {
            domElement = document.getElementById(selector);

            if (!domElement) {
                throw new Error();
            }

        } else {
            domElement = selector;
        }

        allButtons = domElement.querySelectorAll('.button');
        allButtonsLength = allButtons.length;

        for (i = 0; i < allButtonsLength; i += 1) {
            currButton = allButtons.item(i);
            currButton.textContent = 'hide';
        }

        domElement.addEventListener('click', onElementClick, false);

        function onElementClick(event) {
            var nextElement,
                clickedButton;

            if (event.target.className == 'button') {
                clickedButton = event.target;
                nextElement = clickedButton.nextElementSibling;

                if (nextElement.className == 'content' && nextElement.nextElementSibling.className == 'button') {
                    if (nextElement.style.display != 'none') {
                        nextElement.style.display = 'none';
                        clickedButton.innerHTML = 'show';
                    } else {
                        nextElement.style.display = '';
                        clickedButton.innerHTML = 'hide';
                    }
                }
            }
        }

    };
}

module.exports = solve;