function solve() {
    return function(selector) {
        var template = '<h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>' +
            '{{#days}}' +
            '<div class="col-date">' +
            '<div class="date">{{day}}</div>' +
            '<div class="events">' +
            '{{#each events}} {{#if title}}' +
            '<div class="event {{importance}}" title="{{comment}}">' +
            '<div class="title">' +
            '{{title}}' +
            '</div>' +
            '<div class="time">' +
            'at {{time}}' +
            '</div>' +
            '</div>' +
            '{{else}}' +
            '<div class="title">Free slot</div>' +
            '{{/if}} {{/each}}' +
            '</div>' +
            '</div>' +
            '{{/days}}';
        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;