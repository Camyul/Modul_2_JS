function solve() {
    return function(selector, isCaseSensitive) {
        let root = selector,
            addContainer,
            addLabel,
            searchLabel,
            inputAdd,
            inputSearch,
            btnAdd,
            searchContainer;

        if (typeof root === "string") {
            root = document.querySelector(root);
        }
        if (!root || !(root instanceof HTMLElement)) {
            throw new Error('Missing selector');
        }

        addContainer = document.createElement('div');
        addContainer.className += 'items-control';

        addLabel = document.createElement('label');
        addLabel.innerHTML = 'Enter text';
        inputAdd = document.createElement('input');
        addLabel.appendChild(inputAdd);

        btnAdd = document.createElement('a');
        btnAdd.className += 'button';
        btnAdd.innerHTML = 'Add';
        btnAdd.style.display = 'inline-block';

        addContainer.appendChild(addLabel);
        addContainer.appendChild(btnAdd);

        root.appendChild(addContainer);


        searchContainer = document.createElement('div');
        searchContainer.className += 'search-controls';

        searchLabel = document.createElement('label');
        searchLabel.innerHTML = 'Search:';

        inputSearch = document.createElement('input');
        searchLabel.appendChild(inputSearch);

        searchContainer.appendChild(searchLabel);

        root.appendChild(searchContainer);
    };
}

module.exports = solve;