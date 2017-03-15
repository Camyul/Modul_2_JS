function solve() {
    return function(selector) {
        var $element,
            $buttons;

        if (typeof selector !== 'string' || $(selector).length < 1) {
            throw new Error('Wrong input');
        }


        $element = $(selector);


        $buttons = $('.button')
            .html('hide')
            .css('margin-left', '20px')
            .on('click', onButtonClick);
        //console.log($buttons);

        function onButtonClick() {
            var $this = $(this),
                $nextContent = $this.nextAll('.content').first(),
                $nextButton = $nextContent.nextAll('.button').first();

            if ($nextButton.length && $nextContent.length) {
                if ($nextContent.css('display') === 'none') {
                    $nextContent.css('display', '');
                    $this.text('hide');
                } else {
                    $nextContent.css('display', 'none');
                    $this.text('show');
                }
            }
        };
    };
}