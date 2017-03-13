function solve() {
    return function(selector) {
        let $element,
            $buttons;

        if (typeof selector === 'string') {
            $element = $(selector);
        } else if (selector instanceof $) {
            $element = selector;
        } else {
            throw new Error('Wrong selector');
        };

        $buttons = $('.button')
            .html('hide')
            .css('margin-left', '20px')
            .on('click', onButtonClick);
        //console.log($buttons);

        function onButtonClick(ev) {
            let clickedButton = ev.target,
                nextElement = clickedButton.nextElementSibling;
            if (nextElement.clasName !== 'content') {
                //console.log(nextElement);

                nextElement = nextElement.nextElementSibling;
                //console.log(nextElement);
            }
            // console.log(nextElement);


            if (clickedButton.innerHTML === 'hide') {
                clickedButton.innerHTML = 'show';

                nextElement.style.display = 'none';
                // console.log(clickedButton.nextElementSibling);

            } else {
                clickedButton.innerHTML = 'hide';

                nextElement.style.display = '';
            }

        }
    };
}