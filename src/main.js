import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

mapboxgl.accessToken = 'pk.eyJ1IjoidGF5bG9ycDciLCJhIjoiY21uMGpud2JtMGp5ZjJwcHp6bm1tMTNmeSJ9.C5QsANDbTwJ0vMH-ul3jyA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-86.8025, 33.4018],
  zoom: 11
});

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true
  })
);

map.on('load', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const coords = [position.coords.longitude, position.coords.latitude];
    map.flyTo({ center: coords, zoom: 14 });
    new mapboxgl.Marker().setLngLat(coords).addTo(map);
  });
});

class App {
    constructor(){
        this.availability = document.getElementById('availability');
        this.wait = document.getElementById('wait-time');
    }
}