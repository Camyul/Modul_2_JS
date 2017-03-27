function solve() {
    return function(selector, isCaseSensitive) {
        let root = selector,
            addContainer,
            addLabel,
            searchLabel,
            inputAdd,
            inputSearch,
            btnAdd,
            searchContainer,
            resultContainer,
            itemsContainer,
            newAnchor,
            newLi,
            anchorTamplate,
            liTamplate,
            strongElement;

        if (typeof root === "string") {
            root = document.querySelector(root);
        }
        if (!root || !(root instanceof HTMLElement)) {
            throw new Error('Missing selector');
        }

        root.className += 'items-control';

        addContainer = document.createElement('div');
        addContainer.className += 'add-controls';

        addLabel = document.createElement('label');
        addLabel.innerHTML = 'Enter text';
        inputAdd = document.createElement('input');
        addLabel.appendChild(inputAdd);

        btnAdd = document.createElement('a');
        btnAdd.className += 'button';
        btnAdd.innerHTML = 'Add';
        btnAdd.style.display = 'inline-block';

        btnAdd.addEventListener('click', addCreateElement, false);

        addContainer.appendChild(addLabel);
        addContainer.appendChild(btnAdd);

        root.appendChild(addContainer);


        searchContainer = document.createElement('div');
        searchContainer.className = 'search-controls';

        searchLabel = document.createElement('label');
        searchLabel.innerHTML = 'Search:';

        inputSearch = document.createElement('input');
        inputSearch.addEventListener('keyup', filterElement, false);

        searchLabel.appendChild(inputSearch);

        searchContainer.appendChild(searchLabel);

        root.appendChild(searchContainer);


        resultContainer = document.createElement('div');
        resultContainer.className = 'result-controls';

        itemsContainer = document.createElement('ul');
        itemsContainer.className += 'items-list';
        resultContainer.appendChild(itemsContainer);

        itemsContainer.addEventListener('click', deleteButtonClick, false);


        anchorTamplate = document.createElement('a');
        anchorTamplate.className += 'button';
        anchorTamplate.innerHTML = 'X';

        strongElement = document.createElement('strong');

        liTamplate = document.createElement('li');
        liTamplate.className += 'list-item';
        liTamplate.appendChild(anchorTamplate);
        liTamplate.appendChild(strongElement);



        root.appendChild(resultContainer);


        function filterElement(ev) {
            let value = inputSearch.value,
                items = document.querySelectorAll('.list-item');

            if (!isCaseSensitive) {
                value = value.toLowerCase();
            }

            for (let i = 0, len = items.length; i < len; i += 1) {
                let text = items[i].children[1].innerText;

                if (!isCaseSensitive) {
                    text = text.toLowerCase();
                }

                if (text.indexOf(value) < 0) {
                    items[i].style.display = 'none';
                } else {
                    items[i].style.display = '';
                }
            }
        };

        function deleteButtonClick(ev) {
            let node = ev.target;

            if (node.className === 'button') {
                itemsContainer.removeChild(node.parentNode);
            }
        };

        function addCreateElement() {
            let newLi = liTamplate.cloneNode(true);

            newLi.children[1].innerHTML = inputAdd.value;
            inputAdd.value = '';

            itemsContainer.appendChild(newLi);
        };
    };
}

module.exports = solve;