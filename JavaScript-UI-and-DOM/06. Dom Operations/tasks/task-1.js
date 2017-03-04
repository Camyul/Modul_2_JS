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

            validateSelectedByID(id) {
                let item = document.getElementById(id);

                if (item === null) {
                    throw new Error('Element not exist!');
                }
            },

            validateArray(items) {
                if (!Array.isArray(items)) {
                    throw new Error('Must be a Array!');
                }
            }
        }

        Validator.validateStringExist(element);
        Validator.validateArray(contents);
        Validator.validateParams(element, contents);
        //Validator.validateSelectedByID(element);

        let wrapper = document.getElementById(element),
            docFrag = document.createDocumentFragment();

        if (wrapper !== null) {
            for (let i = 0, len = contents.length; i < len; i += 1) {
                let item = document.createElement(contents[i])
                docFrag.appendChild(item);
            }

            wrapper.innerHTML = '';
            wrapper.appendChild(docFrag);

        } else {

            // wrapper = document.getElementsByName(element);
            // if (wrapper === null) {
            //throw new Error('test');
            // }

            for (let i = 0, len = contents.length; i < len; i += 1) {
                let item = document.createElement(contents[i])
                docFrag.appendChild(item);
            }
            document.body.innerHTML = '';
            document.body.appendChild(docFrag);

        }






    };
};