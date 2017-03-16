function solve() {
    return function(selector) {
        var $body,
            $element,
            $selectContainer,
            $selectedOption,
            $optionContainer,
            defaultOption,
            $options = $(selector).find('option');


        if (typeof selector !== 'string' || $(selector).length < 1) {
            throw new Error('Wrong input');
        }

        $body = $(document.body);

        $element = $(selector)
            .attr('id', 'the-select')
            .css('display', 'none');

        $selectContainer = $('<div></div>')
            .addClass('dropdown-list')
            .appendTo($body);


        $optionContainer = $('<div />')
            .addClass('options-container')
            .css('position', 'absolute')
            .css('display', 'none')
            .appendTo($selectContainer);

        for (var i = 0, len = $options.length; i < len; i += 1) {
            var $currentOption = $('<div />')
                .addClass('dropdown-item')
                .attr('data-value', `value-${i + 1}`)
                .attr('data-index', `${i}`)
                .css('color', 'red')
                .html($options[i].text)
                .appendTo($optionContainer);

            if (i === 0) {
                defaultOption = $currentOption;
            }
        }

        $selectedOption = $('<div></div>')
            .addClass('current')
            .attr('data-value', '')
            .html(defaultOption.text())
            .prependTo($selectContainer);


        $selectContainer.prepend($element);

        $selectedOption.on('click', function() { //mouseover work to
            var $this = $(this);

            $optionContainer.css('display', '');

            $this.html('Select Option');
        });

        $optionContainer.on('click', '.dropdown-item', function() {
            var $this = $(this),
                html = $this.html();

            $selectedOption.html(html);

            $optionContainer.css('display', 'none');
        });
    };
}


module.exports = solve;