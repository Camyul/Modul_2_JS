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
        let Validator = {
            validateStringExist(element) {
                if (element.length === 0) {
                    throw new Error('Must be a string!');
                }
            },

            validateParams(element, contents) {
                if (element === null || contents === null) {
                    throw new Error('Params not Exist!');
                }
            },

            validateDomElement(domEl) {

                if (domEl === null) {
                    throw new Error('Element not exist!');
                }
            },

            validateArray(items) {
                if (!Array.isArray(items)) {
                    throw new Error('Must be a Array!');
                }
                for (let i = 0, len = items.length; i < len; i += 1) {

                    if (typeof items[i] !== 'string' && typeof items[i] !== 'number') {
                        throw new Error('Must be a String or Numbrer');
                    }
                }
            }
        }

        Validator.validateStringExist(element);
        Validator.validateArray(contents);
        Validator.validateParams(element, contents);

        let domElement,
            docFrag = document.createDocumentFragment();

        if (typeof element === 'string') {
            domElement = document.getElementById(element);

            Validator.validateDomElement(domElement);
        } else {

            domElement = element;
        }



        let div = document.createElement('div');
        domElement.innerHTML = '';
        for (let i = 0, len = contents.length; i < len; i += 1) {

            let item = div.cloneNode(true);
            item.innerHTML = contents[i];
            docFrag.appendChild(item);
        }

        domElement.appendChild(docFrag);

    };
};