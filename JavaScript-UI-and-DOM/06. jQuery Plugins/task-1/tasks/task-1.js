function solve() {
    return function(selector) {
        if (typeof selector !== 'string' || $(selector).length < 1) {
            throw new Error('Wrong input');
        }

        var $body = $(document.body),
            $element = $(selector)
            .attr('id', 'the-select')
            .css('display', 'none');

        var $selectContainer = $('<div></div>')
            .addClass('dropdown-list')
            .appendTo($body);

        $selectContainer.append($element);
    };
}

module.exports = solve;