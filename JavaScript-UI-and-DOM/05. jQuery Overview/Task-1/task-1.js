function solve() {
    return function(selector, count) {
        let $element = $(selector),
            $ulTemplate,
            tempElement,
            $liTemplate;

        if (Number.isNaN(count)) {
            throw new Error('Count must be a number');
        }

        if (count === null || count < 1) {
            throw new Error('Count is missing or negative');
        }


        tempElement = document.createElement('ul');

        $ulTemplate = $(tempElement)
            .addClass('items-list')
            .appendTo($element);

        tempElement = document.createElement('li');

        for (let i = 0; i < count; i += 1) {
            $liTemplate = $(tempElement.cloneNode(true))
                .addClass('list-item')
                .html(`List item #${i}`)
                .appendTo($ulTemplate);

        }

        //console.log($ulTemplate);
    }
}