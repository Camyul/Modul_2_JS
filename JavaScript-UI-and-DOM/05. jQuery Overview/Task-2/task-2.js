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

        function onButtonClick() {
            let $this = $(this),
                $node = $this.next();

            if ($node.is('br')) {
                $node = $node.next();
            }

            if ($node.hasClass('hidden')) {
                $node.removeClass('hidden');
                if ($node.prev().is('br')) {
                    $node = $node.prev();
                }
                $node.prev().html('hide');
            } else {
                $node.addClass('hidden');
                if ($node.prev().is('br')) {
                    $node = $node.prev();
                }
                $node.prev().html('show');
            }
        }
    };
}