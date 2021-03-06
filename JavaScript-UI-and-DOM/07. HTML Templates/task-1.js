/* globals $ */

/* insert the template here as a string
       example:
       var template =
         '<ul>' +
           '{{#students}}' +
           '<li>' +
             '{{name}}' +
           '</li>' +
           '{{/students}}' +
         '</ul>';
   
       var data = {
           students: [{ name: 'Ivan' }, { name: 'Pesho' }, { name: 'Gosho' }]

       }*/

function solve() {

    return function(selector) {
        var data = {
            headers: ['Vendor', 'Model', 'OS'],
            items: [{
                col1: 'Nokia',
                col2: 'Lumia 920',
                col3: 'Windows Phone'
            }, {
                col1: 'LG',
                col2: 'Nexus 5',
                col3: 'Android'
            }, {
                col1: 'Apple',
                col2: 'iPhone 6',
                col3: 'iOS'
            }]
        };

        var hbTemplate = document.getElementById('hb-tamplate-container').innerHTML;

        /*var hbTemplate = '<table class="items-table">' +
            '<thead>' +
            '<tr>' +
            '<th>#</th>' +
            '{{#each headers}}' +
            '<th>' +
            '{{this}}' +
            '</th>' +
            '{{/each}}' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '{{#each items}}' +
            '<tr>' +
            '<td>{{@index}}</td>' +
            '<td>{{col1}}</td>' +
            '<td>{{col2}}</td>' +
            '<td>{{col3}}</td>' +
            '</tr>' +
            '{{/each}}' +
            '</tbody>' +
            '</table>';*/

        //console.log(hbTemplate);
        template = Handlebars.compile(hbTemplate); //Компилирам Handlebars темплейта
        //console.log(template);
        $(selector).html(template(data)); //Подаваме готовия html на избрания елемент
    };
};

module.exports = solve;