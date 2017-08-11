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
            ipSearch,

            resultControls,
            listResults,
            listItemsTemplate,
            btnDeleteListItem,
            textListItemStrong,
            listItems;

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
        labelSearch.innerHTML = 'search';

        ipSearch = document.createElement('input');
        ipSearch.addEventListener('input', onSearchTextboxInput, false);

        labelSearch.appendChild(ipSearch);
        searchControls.appendChild(labelSearch);

        /* Searching Controls END*/

        /* Result Controls START*/

        resultControls = document.createElement('div');
        resultControls.className = 'result-controls';

        listResults = document.createElement('ul');
        listResults.className = 'items-list';

        listItemsTemplate = document.createElement('li');
        listItemsTemplate.className = 'list-item';

        btnDeleteListItem = document.createElement('a');
        btnDeleteListItem.className = 'button button-delete';
        btnDeleteListItem.innerHTML = "X";

        textListItemStrong = document.createElement('strong');
        listItemsTemplate.appendChild(btnDeleteListItem);
        listItemsTemplate.appendChild(textListItemStrong);

        listResults.addEventListener('click', onListResultClick, false);

        resultControls.appendChild(listResults);

        listItems = element.getElementsByClassName('list-item');



        /* Result Controls END*/

        fragment.appendChild(addControls);
        fragment.appendChild(searchControls);
        fragment.appendChild(resultControls);

        element.appendChild(fragment);
        element.className += 'items-control';

        //Запазване на въведената стойност в input-a и зачистването му
        function onAddButtonClick() {
            let value = ipAdd.value;
            ipAdd.value = '';

            textListItemStrong.innerHTML = value;

            listResults.appendChild(listItemsTemplate.cloneNode(true));
        };

        function onSearchTextboxInput() {
            let i,
                len,
                text,
                pattern = ipSearch.value;

            if (!isCaseSensitive) {
                pattern = pattern.toLowerCase();
            };
            console.log(listItems);
            for (i = 0, len = listItems.length; i < len; i += 1) {
                text = listItems[i].getElementsByTagName('strong')[0].innerHTML;

                if (!isCaseSensitive) {
                    text = text.toLowerCase();
                }

                if (text.indexOf(pattern) < 0) { //Не отговаря на търсенето
                    listItems[i].style.display = 'none';
                } else {
                    listItems[i].style.display = '';
                }
            }
        };

        //Изтриване на parrent-a на кликнатия елемент
        function onListResultClick(ev) {
            let btn = ev.target,
                parent;

            if (btn.className.indexOf('button-delete') < 0) {
                return;
            }

            parent = btn;
            while (parent && parent.className.indexOf('list-item') < 0) {
                //console.log(parent.nodeName);
                console.log(parent);
                //console.log(parent.className);
                console.log(parent.parentNode);
                //console.log(parent.parentNode.className);

                parent = parent.parentNode;
            }

            if (!parent) {
                return;
            }

            listResults.removeChild(parent);
        };
    };
}

module.exports = solve;