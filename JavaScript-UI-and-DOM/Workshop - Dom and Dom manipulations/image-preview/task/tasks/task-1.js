/* globals module */
function solve() {
    return function(selector, items) {
        let container = selector,
            leftBoxImage,
            rightBoxImage,
            leftBoxTitle,
            previewer,
            previewerBox;

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (!container || !(container instanceof HTMLElement)) {
            throw new Error("Invalid HTML Element or selector");
        }

        previewer = createPreviewer();
        container.appendChild(previewer);

        function createPreviewer() {
            previewerBox = createPreviewerBox();

            createLeftBox(previewerBox);
            createRightBox(previewerBox);

            return previewerBox;
        };

        function createPreviewerBox() {
            previewerBox = document.createElement('section');

            previewerBox.style.width = '600px';
            previewerBox.style.height = '400px';
            //previewerBox.style.border = '1px solid #ddd';
            previewerBox.style.borderRadius = '15px';
            previewerBox.style.boxShadow = '1px 1px 10px gray';
            previewerBox.style.display = 'flex';
            previewerBox.style.flexDirection = 'row';
            previewerBox.className = 'previewer-container';


            return previewerBox;
        };

        function createLeftBox(previewerBox) {
            let leftBox = document.createElement('section'),
                strongText;

            leftBox.style.width = '70%';
            leftBox.style.height = '100%';
            leftBox.style.display = 'flex';
            leftBox.style.flexDirection = 'column';
            leftBox.className = 'previewer-leftBox';

            leftBoxTitle = document.createElement('h1');
            strongText = document.createElement('strong');
            leftBoxTitle.style.width = '100%';
            leftBoxTitle.style.marginTop = '7%';
            leftBoxTitle.innerHTML = items[0].title;
            leftBoxTitle.style.textAlign = 'center';
            leftBoxTitle.className = 'previewer-leftBox-title';
            strongText.appendChild(leftBoxTitle);
            leftBox.appendChild(strongText);

            leftBoxImage = document.createElement('img');
            leftBoxImage.src = items[0].url;
            leftBoxImage.style.marginLeft = '5%';
            leftBoxImage.style.width = '90%';
            leftBoxImage.style.height = '75%';
            leftBoxImage.style.borderRadius = '15px';
            leftBoxImage.style.boxShadow = '1px 1px 5px gray'
            leftBox.appendChild(leftBoxImage);

            previewerBox.appendChild(leftBox);
            return previewerBox;
        };

        function createRightBox(previewerBox) {
            let rightBox = document.createElement('aside'),
                labelSearchBox,
                inputBox,
                rightBoxList,
                liTemplate,
                imgTitleTamplete,
                imgTamplete;

            rightBox.style.width = '28%';
            rightBox.style.height = '95%';
            rightBox.style.overflowY = 'auto'; //and scroll - work to
            rightBox.style.textAlign = 'center';
            rightBox.className = 'previewer-rightBox';

            labelSearchBox = document.createElement('label');
            labelSearchBox.innerHTML = 'Filter';
            labelSearchBox.className = 'previewer-rightBox-inputName';
            rightBox.appendChild(labelSearchBox);

            inputBox = document.createElement('input');
            inputBox.className = 'previewer-rightBox-inputBox';
            inputBox.style.width = '90%';

            inputBox.addEventListener('keyup', function() {
                let searchedValue = this.value.toLowerCase(),
                    i,
                    len,
                    liItems = rightBoxList.children,
                    nameImage;
                //console.log(images);
                for (i = 0, len = liItems.length; i < len; i += 1) {
                    nameImage = liItems[i].children[1].title.toLowerCase();
                    //console.log(nameImage);
                    if (nameImage.indexOf(searchedValue) > -1) {
                        liItems[i].style.display = '';
                    } else {
                        liItems[i].style.display = 'none';
                    }
                }
            }, false);

            rightBox.appendChild(inputBox);

            rightBoxList = document.createElement('ul');
            rightBoxList.style.listStyleType = 'none';
            rightBoxList.style.padding = '0';
            rightBoxList.style.marginTop = '0';
            rightBoxList.className = 'previewer-rightBox-list';

            liTemplate = document.createElement('li');

            imgTitleTamplete = document.createElement('h4');
            imgTitleTamplete.style.margin = '0';

            imgTamplete = document.createElement('img');
            imgTamplete.style.width = '90%';
            imgTamplete.style.borderRadius = '5px';

            let li,
                imgTitle,
                img, i, len;
            for (i = 0, len = items.length; i < len; i += 1) {

                li = liTemplate.cloneNode(true);
                img = imgTamplete.cloneNode(true);
                imgTitle = imgTitleTamplete.cloneNode(true);

                imgTitle.innerHTML = items[i].title;
                img.src = items[i].url;
                img.title = items[i].title;

                addImageEvent(img);

                li.appendChild(imgTitle);
                li.appendChild(img);


                rightBoxList.appendChild(li);

            }

            rightBox.appendChild(rightBoxList);
            previewerBox.appendChild(rightBox);
            return previewerBox;
        };

        function addImageEvent(img) {
            img.addEventListener('click', changeLeftContent, false);
            img.addEventListener('mouseover', mouseOverImage, false);
            img.addEventListener('mouseout', mouseOutImage, false);

            function changeLeftContent() {
                leftBoxTitle.innerHTML = img.title;
                leftBoxImage.src = img.src;
            };

            function mouseOverImage() {
                let listItem = img.parentNode;
                //console.log(listItem.name);
                listItem.style.background = 'lightgray';
            }

            function mouseOutImage() {
                let listItem = img.parentNode;
                //console.log(listItem.name);
                listItem.style.background = 'none';
            }
        };


    };
}

module.exports = solve;