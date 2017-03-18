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
        ctx,
        img;

    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');



    $root.css('width', '42px')
        .css('height', '42px')
        .css('background-color', 'gray')
        .css('border-radius', '5px')
        .css('box-shadow', '0px 0px 5px black');


    $colorPickerPanel = $('<div/>')
        .addClass('color-picker-panel')
        .css('width', '260px')
        .css('height', '315px')
        .css('position', 'absolute')
        .hide()
        .appendTo($root);

    canvas.width = 256;
    canvas.height = 256;
    $colorPickerPanel.append(canvas);
    canvas.setAttribute('id', 'the-canvas');



    $closeBtn = $('<img/>')
        .addClass('close-btn')
        .attr('src', './imgs/close.png')
        .css('position', 'absolute')
        .css('top', '-30px')
        .css('left', '-45px')
        .appendTo($colorPickerPanel)
        .click(function() {
            $colorPickerPanel.hide();
            $root.css('width', '42px')
                .css('height', '42px');
            $startIcon.show();
        });


    img = document.createElement('img');
    img.src = './imgs/color-picker.png';
    img.id = 'canvas-image-container';
    document.body.appendChild(img);

    drawCanvas();

    $inputHEX = $('<input/>')
        .addClass('input-HEX')
        .css('position', 'absolute')
        .css('top', '282px')
        .css('left', '-10px')
        .attr('placeholder', 'HEX')
        .appendTo($colorPickerPanel);

    $inputRGB = $('<input/>')
        .addClass('input-RGB')
        .css('position', 'absolute')
        .css('top', '312px')
        .css('left', '-10px')
        .attr('placeholder', 'RGB')
        .appendTo($colorPickerPanel);

    $inputColor = $('<input/>')
        .addClass('input-color')
        .css('position', 'absolute')
        .css('top', '282px')
        .css('left', '150px')
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

    function drawCanvas() {
        ctx.drawImage(img, 0, 0, 256, 256);
    }



    canvas.addEventListener('mousemove', function(ev) {
        let x = ev.layerX,
            y = ev.layerY,
            pixel = ctx.getImageData(x, y, 1, 1),
            rgb = `rgb( ${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]})`,
            hexColor = `#${pixel.data[0].toString(16).toUpperCase()}${pixel.data[1].toString(16).toUpperCase()}${pixel.data[2].toString(16).toUpperCase()}`;

        $inputColor.css('background', `${rgb}`);
        $inputRGB.val(rgb);
        $inputHEX.val(hexColor);
    });
}