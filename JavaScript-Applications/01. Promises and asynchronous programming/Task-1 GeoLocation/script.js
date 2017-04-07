(function() {
    let body = document.body,
        element = document.createElement('div');
    element.className += ' geo';
    element.style.boxShadow = '0 0 10px red';
    element.style.width = '500px';
    element.style.height = '500px';
    element.style.display = 'none';
    body.appendChild(element);

    function getGeoLocationPosition() {
        return new Promise((resolve, reject) => { //create Promise
            navigator.geolocation.getCurrentPosition(
                (position) => (resolve(position)),
                (error) => (reject(error))
            );
        });
    };

    function parseCoords(geolocationPosition) {
        if (geolocationPosition.coords) {
            console.log(geolocationPosition);
            return {
                lat: geolocationPosition.coords.latitude,
                long: geolocationPosition.coords.longitude,
            };
        } else {
            throw new Error('No coords element found');
        }
    };

    function createMap(mapCoords) {
        let img = document.createElement('img'),
            src = `http://maps.googleapis.com/maps/api/staticmap?center=${mapCoords.lat},${mapCoords.long}&zoom=13&size=500x500&sensor=false`;

        img.src = src;
        element.appendChild(img);
        element.style.display = '';
    }

    getGeoLocationPosition()
        .then(parseCoords)
        .then(createMap);

    setInterval(function() {
        let currentTime = new Date(),
            clock = document.getElementById('clock');
        clock.innerHTML = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    }, 1000);
}());