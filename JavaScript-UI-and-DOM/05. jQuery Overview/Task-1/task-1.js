function solve() {
    return function(selector, count) {
        var $element = $(selector),
            $ulTemplate,
            tempElement,
            $liTemplate;

        if (typeof selector !== 'string') {
            throw new Error('Selector must be a string');
        }

        if (!Number(count) || Number(count) < 1) {
            throw new Error('Count must be a number or negative');
        }

        if (!$(selector).length) {
            return this;
        }

        tempElement = document.createElement('ul');

        $ulTemplate = $(tempElement)
            .addClass('items-list')
            .appendTo($element);

        tempElement = document.createElement('li');

        for (var i = 0; i < Number(count); i += 1) {
            $liTemplate = $(tempElement.cloneNode(true))
                .addClass('list-item')
                .html(`List item #${i}`)
                .appendTo($ulTemplate);

        }

        //console.log($ulTemplate);
    }
}