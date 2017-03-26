/* globals $ */
$.fn.gallery = function(columns) {
    columns = columns || 4;
    var $this = this;
    var $selected = $this.find('.selected');
    var $imageContainers = $this.find('.image-container');
    var $prevImage = $this.find('#previous-image');
    var $currentImage = $this.find('#current-image');
    var $nextImage = $this.find('#next-image');

    var count = 0;


    $imageContainers.each(function(index, imageContainer) {
        var $imageContainer = $(imageContainer);

        if (count === columns) {
            $imageContainer.after($('<div/>'))
                .addClass('clearfix');
            count = 0;
        }
        count += 1;
    });

    $('.gallery-list').on('click', '.image-container', function() {
        var $this = $(this);

        $('.gallery-list').addClass('blurred')
            .addClass('disabled-background');

        $currentImage.attr('src', $this.find('img').attr('src'));

        var currentIndex = $this.find('img').attr('data-info') - 1;

        var prevIndex = currentIndex - 1;
        var $prev = $imageContainers.eq(prevIndex);
        $prevImage.attr('src', $prev.find('img')
                .attr('src'))
            .attr('data-info', prevIndex + 1);;

        var nextIndex = (currentIndex + 1) % $imageContainers.length;

        var $next = $imageContainers.eq(nextIndex);
        $nextImage.attr('src', $next.find('img')
                .attr('src'))
            .attr('data-info', nextIndex + 1);

        $selected.show();
    });

    $('.current-image').on('click', function() {
        $selected.hide();

        $('.gallery-list').removeClass('blurred')
            .removeClass('disabled-background');
    });

    $prevImage.on('click', function() {
        var $this = $(this);
        var currentIndex = $this.attr('data-info') - 1;
        var prevIndex = currentIndex - 1;
        var nextIndex = (currentIndex + 1) % $imageContainers.length;

        var $current = $imageContainers.eq(currentIndex).find('img');
        var $prev = $imageContainers.eq(prevIndex).find('img');
        var $next = $imageContainers.eq(nextIndex).find('img');

        $currentImage.attr('src', $current.attr('src'))
            .attr('data-info', currentIndex + 1);

        $prevImage.attr('src', $prev.attr('src'))
            .attr('data-info', prevIndex + 1);

        $nextImage.attr('src', $next.attr('src'))
            .attr('data-info', nextIndex + 1);
    });

    $nextImage.on('click', function() {
        var $this = $(this);
        var currentIndex = $this.attr('data-info') - 1;
        var prevIndex = currentIndex - 1;
        var nextIndex = (currentIndex + 1) % $imageContainers.length;

        var $current = $imageContainers.eq(currentIndex).find('img');
        var $prev = $imageContainers.eq(prevIndex).find('img');
        var $next = $imageContainers.eq(nextIndex).find('img');

        $currentImage.attr('src', $current.attr('src'))
            .attr('data-info', currentIndex + 1);

        $prevImage.attr('src', $prev.attr('src'))
            .attr('data-info', prevIndex + 1);

        $nextImage.attr('src', $next.attr('src'))
            .attr('data-info', nextIndex + 1);
    });

    $this.addClass('gallery');
    $selected.hide();
};