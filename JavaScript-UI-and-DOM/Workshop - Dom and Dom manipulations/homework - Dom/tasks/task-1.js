/* globals $ */

/* 

Create a function that takes an id or DOM element and an array of contents

* if an id is provided, select the element
* Add divs to the element
  * Each div's content must be one of the items from the contents array
* The function must remove all previous content from the DOM element provided
* Throws if:
  * The provided first parameter is neither string or existing DOM element
  * The provided id does not select anything (there is no element that has such an id)
  * Any of the function params is missing
  * Any of the function params is not as described
  * Any of the contents is neight `string` or `number`
    * In that case, the content of the element **must not be** changed   
*/

module.exports = function() {

    return function(element, contents) {
        let selectedElement = element,
            fragment,
            i,
            len = contents.length,
            div,
            newDiv;



        if (typeof selectedElement === 'string') {
            selectedElement = document.getElementById(selectedElement);
        }

        if (!selectedElement || !(selectedElement instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement or selector');
        }

        for (i = 0, len = contents.length; i < len; i += 1) {

            if (typeof contents[i] !== 'string' && typeof contents[i] !== 'number') {
                throw new Error('Must be a String or Numbrer');
            }
        }


        fragment = document.createDocumentFragment();

        div = document.createElement('div');
        selectedElement.innerHTML = '';

        if (len !== 0) {
            for (i = 0; i < len; i += 1) {

                newDiv = div.cloneNode(true);
                newDiv.innerHTML = contents[i];
                fragment.appendChild(newDiv);
            }
        }



        selectedElement.appendChild(fragment);
    };
};