/* globals module */
function solve() {

    // empty the container
    function clear(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    return function(selector, items) {
        let root = document.querySelector(selector),
            leftDiv = document.createElement('div'),
            rightDiv = leftDiv.cloneNode(true),
            img,
            leftStrong,
            leftHeather,
            rightStrong,
            rightHeather,
            filter,
            input,
            innerRightDiv;

        leftDiv.className += 'left';
        img = document.createElement('img');
        img.src = items[0].url;
        img.className = 'left-container';
        leftStrong = document.createElement('strong');
        leftHeather = document.createElement('h2');
        leftHeather.innerText = items[0].title;
        leftStrong.appendChild(leftHeather);
        leftDiv.appendChild(leftStrong);
        leftDiv.appendChild(img);

        rightDiv.className += 'right';
        filter = document.createElement('h4');
        filter.innerHTML = 'Filter';
        input = document.createElement('input');

        rightDiv.appendChild(filter);
        rightDiv.appendChild(input);


        for (let i = 0, len = items.length; i < len; i += 1) {
            let tempImage = document.createElement('img'),
                imgContainer = document.createElement('ul'),
                liTamplate = document.createElement('li');

            rightStrong = document.createElement('strong');
            rightHeather = document.createElement('h4');
            rightHeather.innerHTML = items[i].title;
            rightStrong.appendChild(rightHeather);
            liTamplate.appendChild(rightStrong);
            tempImage.src = items[i].url;
            tempImage.alt = items[i].title;
            liTamplate.appendChild(tempImage);
            liTamplate.className += 'image-container';

            imgContainer.appendChild(liTamplate);
            rightDiv.appendChild(imgContainer);

            tempImage.addEventListener('mouseover', function(ev) {
                let target = ev.target;
                if (target.parentElement.className.indexOf('image-container') < 0) {
                    return;
                }

                target.parentElement.style.background = 'grey';
            }, false);

            tempImage.addEventListener('mouseout', function(ev) {
                let target = ev.target;
                if (target.parentElement.className.indexOf('image-container') < 0) {
                    return;
                }

                target.parentElement.style.background = '';
            }, false);

            tempImage.addEventListener('click', function(ev) {
                let target = ev.target;

                if (!(target instanceof HTMLElement)) {
                    return;
                }

                img.src = target.src;
                leftHeather.innerText = target.alt;
            }, false);

        }

        input.addEventListener('keyup', function(ev) {
            let searchedValue = this.value.toLowerCase(),
                liItems = document.querySelectorAll('li');
            //console.log(searchedValue);

            for (let i = 0, len = liItems.length; i < len; i += 1) {
                let nameImage = liItems[i].firstChild.alt;
                console.log(nameImage);
                console.log(nameImage);
                if (nameImage.indexOf(searchedValue) < 0) {
                    liItems[i].style.display = 'none';
                } else {
                    liItems[i].style.display = '';
                }
            }

        }, false);




        clear(root);
        root.appendChild(leftDiv);
        root.appendChild(rightDiv);
    };
}

module.exports = solve;