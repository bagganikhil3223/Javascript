'use strict';



class Workout {
    date = new Date();
    id= (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords,distance,duration) {
        this.coords = coords; // [lat,lng]
        this.distance = distance; // in km 
        this.duration = duration; // in min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    click() {
      this.clicks++;
    }
}

class Running extends Workout {
    type='running';
    constructor(coords,distance,duration,cadence) {
        super(coords,distance,duration);
        this.cadence = cadence;
        // this.type = 'running';
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km

        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords,distance,duration,elevationGain) {
        super(coords,distance,duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();

    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }

}

// const run1 = new Running([39,-12],5.2,24,178);
// const cycling1 = new Cycling([39,-12],27,95,523);
// console.log(run1,cycling1);


///////////////////
// APPLICATION ARCHITECTURE


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  constructor() {
    // get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // here using bind to manually setting this , as inside regular fn this is undefined
        function () {
          alert('Could not get your Position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    // console.log(this); // this is undefined as it is called by getGeolocation method, which is a regular function and inside a regular fn (this is undefined, so we are manually setting this to current obj)

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // L.marker(coords).addTo(map)
    //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //     .openPopup();

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work=> {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    form.style.display = 'none'; // used to trigger animation
    form.classList.add('hidden');
    setTimeout(() => form.style.display = 'grid',1000); // resetting the display to grid after 1 second after animation finishes
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // get data from form

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // if workout running, then create running object

    if (type === 'running') {
      const cadence = +inputCadence.value;
      // check if data is valid

      // Guard clause
      // if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence))
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // if workout cycling, then create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // check if data is valid
      // Guard Clause

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // add new object to workout array
    this.#workouts.push(workout);

    // Display Marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide Form + Clearing input fields
    this._hideForm();

    // Set local storage to all workouts

    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Render workout on map as marker

    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.type === 'running' ? '🏃' :'🚴‍♀️'} ${workout.description}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃' :'🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    if(workout.type === 'running') {

        html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    }

    if(workout.type === 'cycling') {
        html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
    }

    form.insertAdjacentHTML('afterend',html);
  }

  _moveToPopup(e) {

    const workoutEl = e.target.closest('.workout');

    if(!workoutEl) return;

    const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

    this.#map.setView(workout.coords,this.#mapZoomLevel,{
      animate:true,
      pan:{
        duration:1,
      }
    });

    // using the public interface

    // workout.click();

  }

  _setLocalStorage() {
    localStorage.setItem('workouts',JSON.stringify(this.#workouts)) ; // json.stringfy to convert any js object into string
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts')); // json.parse to convert a string into js object array
    // so whenever we get the stored data from local storage, these objects lose their prototype chain and become regular objects 

    // Guard Clause
    if(!data) return;
    this.#workouts = data;

    this.#workouts.forEach(work=> {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload(); // reloading the page manually 
  }
}

const app = new App();

// console.log(firstName); // accessed this variable present in other script as this is a global variable and we can access global variables in any of the scripts present
// Also NOTE --> we are only able to get this firstName variable here because other.js script is mentioned before in the order than script.js ,else we would have not been able to access it.
