import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const token = import.meta.env.VITE_MAPBOX_TOKEN;

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-86.8025, 33.4018],
  zoom: 11
});

class App {
    constructor(){
        this.availability = document.getElementById('availability');
        this.wait = document.getElementById('wait-time');
    }
}