function solve() {

    return function(selector, isCaseSensitive) {
        let element = selector,
            fragment,

            addControls,
            labelAdd,
            btnAdd,
            ipAdd,

            searchControls,
            labelSearch,
            ipSearch;

        if (isCaseSensitive !== true) {
            isCaseSensitive = false;
        }

        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        if (!element || !(element instanceof HTMLElement)) {
            throw new Error("Invalid HTML element or selector");
        }

        fragment = document.createDocumentFragment();

        /* Add Controls - Start */
        addControls = document.createElement('div');
        addControls.className = 'add-controls';

        labelAdd = document.createElement("label");
        labelAdd.innerHTML = 'Enter Text: ';

        ipAdd = document.createElement("input");

        labelAdd.appendChild(ipAdd);

        btnAdd = document.createElement('a');
        btnAdd.className = 'button';
        btnAdd.addEventListener('click', onAddButtonClick, false);
        btnAdd.innerHTML = 'Add';
        btnAdd.style.display = 'inline-block';

        addControls.appendChild(labelAdd);
        addControls.appendChild(btnAdd);
        /* Add Controls END */

        /* Searching Controls START*/
        searchControls = document.createElement('div');
        searchControls.className = 'search-controls';

        labelSearch = document.createElement('label');
        labelSearch.innerHTML = 'searrch';

        ipSearch = document.createElement('input');
        ipSearch.addEventListener('click', onSearchTextboxInput, false);

        labelSearch.appendChild(ipSearch);
        searchControls.appendChild(labelSearch);

        /* Searching Controls END*/

        /* Result Controls START*/

        /* Result Controls END*/

        fragment.appendChild(addControls);
        fragment.appendChild(searchControls);

        element.appendChild(fragment);
        element.className += 'items-control';

        function onAddButtonClick() {
            let value = ipAdd.value;
            ipAdd.value = '';


        };

        function onSearchTextboxInput() {

        };
    };
}

module.exports = solve;