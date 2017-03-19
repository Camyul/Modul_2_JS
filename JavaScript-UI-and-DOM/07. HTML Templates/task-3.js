function solve() {
    return function() {
        $.fn.listview = function(data) {
            var $this = $(this),
                len = data.length,
                $source,
                $templateSourceId,
                template;

            $templateSourceId = $this.attr('data-template');
            $source = $('#' + $templateSourceId).html();

            template = handlebars.compile($source);

            for (var i = 0; i < len; i += 1) {
                $this.append(template(data[i]));
            }

            return this;
        };
    };
}

module.exports = solve;