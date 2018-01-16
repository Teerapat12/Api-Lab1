let map;
let marker;
const textField = document.getElementById('searchTextField');

/* global google */

/* eslint no-unused-vars: "off" */
function initMap() {
    const center = new google.maps.LatLng(60.223385, 24.805091);
    const zoom = 10;
    const setting = {
        center,
        zoom,
    };

    const mapDiv = document.getElementById('map');
     map = new google.maps.Map(mapDiv, setting);

     // Adding Marker to the center of the map.
     marker = new google.maps.Marker({
        position: center,
        map: map,
        title: textField.value,
        });
}

function onSearchResult(results, status) {
    if (status=='OK') {
        const loc = results[0].geometry.location;
        map.setCenter(loc);
        marker.setPosition(loc);
    } else {
        alert('Address not found');
        textField.value = '';
    }
}

function onSubmit(e) {
    e.preventDefault();
    const query = textField.value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': query}, onSearchResult);
}

const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', onSubmit);
