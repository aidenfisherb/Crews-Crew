import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';


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
        this.seats = document.getElementById('seats');
        this.capacity = 36;
        this.seats = Array(this.capacity).fill(true);
        this.alert = document.getElementById('alert');
    }

    assignAvailability(){
        const icons = document.querySelectorAll('.bi-app');

        icons.forEach((icon, index) => {
            const isAvailable = this.seats[index];
            icon.classList.add(isAvailable ? 'text-success' : 'text-danger');
        });   
    }

    updateAvailableSeats() {
        const availableSeats = [];

        for (let i = 0; i < this.seats.length; i++) {
            if (this.seats[i] === true) {
                availableSeats.push(i + 1);
            }
        }

        document.getElementById('available-seats').textContent = availableSeats.join(', ');
    }
    
    bookSeat() {
        const input = document.getElementById('seats');
        const seatNumber = parseInt(input.value) - 1;

        if (isNaN(seatNumber) || seatNumber < 0 || seatNumber >= this.capacity) {
            this.alert.innerHTML = '';
            this.alert.innerHTML += 
            `
            <div id="alert" class="alert alert-danger text-center col-8 alert-dismissible fade show" role="alert">
                Invalid seat number. Please enter a number between 1 and ${this.capacity}.
             </div>
            `
            return;
        }

        if (this.seats[seatNumber] === false) {
            this.alert.innerHTML = '';
            this.alert.innerHTML += 
            `
            <div id="alert" class="alert alert-danger text-center col-8 alert-dismissible fade show" role="alert">
                Seat ${input.value} is already booked.
            </div>
            `
            return;
        }

        this.alert.innerHTML = '';
        this.seats[seatNumber] = false;
        this.assignAvailability();
        this.updateAvailableSeats();
        input.value = '';
    }
}

const app = new App();
app.assignAvailability();
app.updateAvailableSeats();

document.querySelector('.btn-primary').addEventListener('click', () => {
    app.bookSeat();
});
