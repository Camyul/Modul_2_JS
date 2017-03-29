function solve(data) {
    data = data || [];

    var tamplete = '<div class="tabs-control">' +
        '<ul class="list list-titles">' +
        '{{#titles}}' +
        '<li class="list-item">' +
        '<label for="{{link}}" class="title">{{text}}</label>' +
        '</li>' +
        '{{/titles}}' +
        '</ul>' +
        '<ul class="list list-contents">' +
        '{{#contents}}' +
        '<li class="list-item">' +
        '<input id="{{link}}" {{#if @first}}checked="checked"{{/if}} class="tab-content-toggle" type="radio" name="tab-toggles">' +
        '<div class="content">' +
        '{{{text}}}' +
        '</div>' +
        '</li>' +
        '{{/contents}}' +
        '</ul>' +
        '</div>';

    return tamplete;
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}