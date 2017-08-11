function solve() {

    return function(selector, defaultLeft, defaultRight) {

        var root = selector,
            columnContainer,
            leftColumn,
            rightColumn,
            input,
            button,
            leftHeadColumn,
            rightHeadColumn,
            leftRadioInput,
            leftRadioLabel,
            rightRadioInput,
            rightRadioLabel,
            leftOrderedList,
            rightOrderedList,
            liTemplate,
            i,
            len,
            img,
            deleteButton;

        if (typeof root === 'string') {
            root = document.querySelector(root);
        }

        if (!root) {
            throw new Error("Invalid HTML element or selector");
        }

        leftRadioInput = document.createElement('input');
        leftRadioInput.setAttribute('type', 'radio');
        leftRadioInput.setAttribute('checked', 'checked');
        leftRadioInput.id = 'select-left-column';
        leftRadioInput.name = 'column-select';

        leftRadioLabel = document.createElement('label');
        leftRadioLabel.setAttribute('for', 'select-left-column');
        leftRadioLabel.innerText = 'Add here';

        rightRadioLabel = document.createElement('label');
        rightRadioLabel.setAttribute('for', 'select-right-column');
        rightRadioLabel.innerText = 'Add here';

        rightRadioInput = document.createElement('input');
        rightRadioInput.setAttribute('type', 'radio');
        rightRadioInput.id = 'select-right-column';
        rightRadioInput.name = 'column-select';

        leftHeadColumn = document.createElement('div');
        leftHeadColumn.className = 'select';
        leftHeadColumn.appendChild(leftRadioInput);
        leftHeadColumn.appendChild(leftRadioLabel);

        rightHeadColumn = document.createElement('div');
        rightHeadColumn.className = 'select';
        rightHeadColumn.appendChild(rightRadioInput);
        rightHeadColumn.appendChild(rightRadioLabel);

        leftOrderedList = document.createElement('ol');

        rightOrderedList = document.createElement('ol');

        liTemplate = document.createElement('li');
        liTemplate.className = 'entry';

        img = document.createElement('img');
        img.className = 'delete';
        img.src = './imgs/Remove-icon.png';

        columnContainer = document.createElement('div');
        columnContainer.className = 'column-container';

        if (defaultLeft) {
            for (i = 0, len = defaultLeft.length; i < len; i += 1) {
                //liTemplate.appendChild(img.cloneNode(true));
                liTemplate.innerHTML = '<img class="delete" src="imgs/Remove-icon.png"> ' + defaultLeft[i];

                leftOrderedList.appendChild(liTemplate.cloneNode(true));

            }
        }

        if (defaultRight) {
            for (i = 0, len = defaultRight.length; i < len; i += 1) {
                //liTemplate.appendChild(img.cloneNode(true));
                liTemplate.innerHTML = '<img class="delete" src="imgs/Remove-icon.png"> ' + defaultRight[i];
                rightOrderedList.appendChild(liTemplate.cloneNode(true));

            }
        }

        leftColumn = document.createElement('div');
        leftColumn.className = 'column';
        leftColumn.appendChild(leftHeadColumn);
        leftColumn.appendChild(leftOrderedList);

        rightColumn = document.createElement('div');
        rightColumn.className = 'column';
        rightColumn.appendChild(rightHeadColumn);
        rightColumn.appendChild(rightOrderedList);

        columnContainer.appendChild(leftColumn);
        columnContainer.appendChild(rightColumn);


        input = document.createElement('input');
        input.setAttribute("size", 40);
        input.setAttribute("autofocus", '');

        button = document.createElement('button');
        button.innerText = 'Add';
        button.addEventListener('click', onAddButtonClick, false);

        root.appendChild(columnContainer);
        root.appendChild(input);
        root.appendChild(button);

        function onAddButtonClick() {
            var value = input.value;
            input.value = '';

            liTemplate.innerHTML = '<img class="delete" src="imgs/Remove-icon.png"> ' + value;
            if (leftRadioInput.checked) {
                leftOrderedList.appendChild(liTemplate.cloneNode(true));
            } else {
                rightOrderedList.appendChild(liTemplate.cloneNode(true));
            }
        };

        leftOrderedList.addEventListener('click', onListResultClick, false);
        rightOrderedList.addEventListener('click', onListResultClick, false);

        function onListResultClick(ev) {
            var btn = ev.target,
                parent;

            parent = btn;
            while (parent && parent.className.indexOf('entry') < 0) {
                //console.log(parent.nodeName);
                //console.log(parent);
                //console.log(parent.className);
                console.log(parent.parentNode.innerHTML);
                //console.log(parent.parentNode.className);
                var index = parent.parentNode.innerHTML.lastIndexOf('>'),
                    str = parent.parentNode.innerHTML.substring(index + 2);
                console.log(str);

                input.value = str;
                parent = parent.parentNode;
            }

            this.removeChild(parent);
        };
    };
}

// SUBMIT THE CODE ABOVE THIS LINE

if (typeof module !== 'undefined') {
    module.exports = solve;
}