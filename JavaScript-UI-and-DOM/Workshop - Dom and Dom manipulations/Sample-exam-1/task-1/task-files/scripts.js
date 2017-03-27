function createCalendar(selector, events) {
    let root,
        fragment,
        divElement,
        divHeather,
        divContent,
        DAYS_IN_MONTH = 30,
        date = new Date('2014-06-01');

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

    divHeather = document.createElement('div');
    divHeather.style.height = '20%';
    divHeather.style.background = 'lightgray';
    divHeather.style.border = '1px solid black';

    divContent = document.createElement('div');
    divContent.style.height = '80%';
    divContent.style.border = '1px solid black';

    divElement.appendChild(divHeather);
    divElement.appendChild(divContent);

    for (let i = 0; i < DAYS_IN_MONTH; i += 1) {
        divElement.id = i + 1;
        date.setDate(i + 2);
        divElement.firstChild.innerText = date.toString('dddd, mmmm, yyyy');
        fragment.appendChild(divElement.cloneNode(true));
    }

    for (let i = 0, len = events.length; i < len; i += 1) {

        let setEvent = fragment.getElementById(events[i].date);
        setEvent.lastChild.innerText = `${events[i].hour} ${events[i].title}`;
    }


    root.appendChild(fragment);
}