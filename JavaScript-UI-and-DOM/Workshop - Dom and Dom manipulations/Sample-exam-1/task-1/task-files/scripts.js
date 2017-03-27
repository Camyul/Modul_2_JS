function createCalendar(selector, events) {
    let root,
        fragment,
        divElement,
        divHeather,
        divContent,
        DAYS_IN_MONTH = 30,
        date = new Date('2014-06-01'),
        options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        calendarDay;

    if (!selector) {
        throw new Error('Need a selector');
    }

    root = document.querySelector(selector);
    root.style.display = 'flex';
    root.style.flexWrap = 'wrap';
    root.style.width = '700px';


    fragment = document.createDocumentFragment();

    divElement = document.createElement('div');
    divElement.style.width = '100px';
    divElement.style.height = '100px';
    divElement.className += 'calendar-day';

    divHeather = document.createElement('div');
    divHeather.style.height = '25%';
    divHeather.style.background = 'lightgray';
    divHeather.style.border = '1px solid black';
    divHeather.style.fontSize = '10px';

    divContent = document.createElement('div');
    divContent.style.height = '75%';
    divContent.style.border = '1px solid black';


    divElement.appendChild(divHeather);
    divElement.appendChild(divContent);



    for (let i = 0; i < DAYS_IN_MONTH; i += 1) {
        divElement.id = i + 1;
        date.setDate(i + 1);
        divElement.firstChild.innerText = date.toLocaleDateString("en-US", options);



        fragment.appendChild(divElement.cloneNode(true));
    }

    for (let i = 0, len = events.length; i < len; i += 1) {

        let setEvent = fragment.getElementById(events[i].date);
        setEvent.lastChild.innerText = `${events[i].hour} ${events[i].title}`;
    }

    root.appendChild(fragment);

    calendarDay = root.querySelectorAll('.calendar-day');
    for (let i = 0, len = calendarDay.length; i < len; i += 1) {
        calendarDay[i].addEventListener('mouseenter', function() {
            this.firstChild.style.background = 'gray';
        }, false);

        calendarDay[i].addEventListener('mouseout', function() {
            this.firstChild.style.background = 'lightgray';
        }, false);

        calendarDay[i].addEventListener('click', function() {

            let clickedElement = root.querySelector('.clicked');
            console.log(clickedElement);
            if (clickedElement) {
                clickedElement.style.background = '';
                clickedElement.className = 'calendar-day';
            }


            this.style.background = 'cyan';
            this.className += ' clicked';
        }, false);
    }
}