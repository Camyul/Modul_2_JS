$.fn.colorpicker = function() {
    let $root = $(this),
        $colorPickerPanel,
        $startIcon,
        $closeBtn,
        $colopPalette,
        $inputHEX,
        $inputRGB,
        $inputColor,
        canvas,
        ctx;

    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    $root.css('width', '42px')
        .css('height', '42px')
        .css('background-color', 'gray')
        .css('border-radius', '5px')
        .css('box-shadow', '0px 0px 5px black');


    $colorPickerPanel = $('<div/>')
        .addClass('color-picker-panel')
        .css('width', '100px')
        .css('height', '300px')
        .css('position', 'relative')
        .hide()
        .appendTo($root);

    $closeBtn = $('<img/>')
        .addClass('close-btn')
        .attr('src', './imgs/close.png')
        .css('position', 'absolute')
        .css('top', '-45px')
        .css('left', '-130px')
        .appendTo($colorPickerPanel)
        .click(function() {
            $colorPickerPanel.hide();
            $root.css('width', '42px')
                .css('height', '42px');
            $startIcon.show();
        });

    $colopPalette = $('<img/>')
        .addClass('color-palette')
        .attr('src', './imgs/color-picker.png')
        .css('position', 'absolute')
        .css('top', '-15px')
        .css('left', '-80px')
        .appendTo($colorPickerPanel);

    $inputHEX = $('<input/>')
        .addClass('input-HEX')
        .css('position', 'absolute')
        .css('top', '262px')
        .css('left', '-97px')
        .attr('placeholder', 'HEX')
        .appendTo($colorPickerPanel);

    $inputRGB = $('<input/>')
        .addClass('input-RGB')
        .css('position', 'absolute')
        .css('top', '292px')
        .css('left', '-97px')
        .attr('placeholder', 'RGB')
        .appendTo($colorPickerPanel);

    $inputColor = $('<input/>')
        .addClass('input-color')
        .css('position', 'absolute')
        .css('top', '262px')
        .css('left', '80px')
        .appendTo($colorPickerPanel);

    $startIcon = $('<img/>')
        .addClass('color-picker-icon')
        .attr('src', './imgs/icon.jpg')
        .appendTo($root)
        .click(function() {
            $(this).hide();
            $root.css('width', '370px')
                .css('height', '410px');

            $colorPickerPanel.show();
        });




}