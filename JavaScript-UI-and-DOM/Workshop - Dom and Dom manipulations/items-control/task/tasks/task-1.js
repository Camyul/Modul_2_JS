function solve() {
    return function(selector, isCaseSensitive) {
        var element = selector,
            fragment,

            addControls,
            labelAdd,
            btnAdd,
            ipAdd;

        if (isCaseSensitive !== true) {
            isCaseSensitive = false;
        }

        if (typeof element === 'string') {
            element = document.querySelector('element');
        }

        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTML Element or selector');
        }

        fragment = document.createDocumentFragment();

        //Add Controls - Start
        addControls = document.createElement('div');
        addControls.className = 'add-controls';

        labelAdd = document.createElement("label");
        //labelAdd.innerText = 'Enter Text: ';
        labelAdd.innerHTML = 'Enter Text: ';

        ipAdd = document.createElement("input");

        labelAdd.appendChild(ipAdd);

        btnAdd = document.createElement('a');
        btnAdd.className = 'button';
        //btnAdd.addEventListener('click', onAddButtonClick, false);
        btnAdd.innerHTML = 'Add';
        btnAdd.style.display = 'inline-block';

        addControls.appendChild(labelAdd);
        addControls.appendChild(btnAdd);
        //Add Controls END



        fragment.appendChild(addControls);

        element.appendChild(fragment);
        element.className += 'items-control';
    };
}

module.exports = solve;