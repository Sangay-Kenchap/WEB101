// ========================================
// API CONFIGURATION
// ========================================

const WEATHER_API_KEY = 'c7a2a70c79708c9598159fd1ad8cdb3f';

const WEATHER_API_URL =
    'https://api.openweathermap.org/data/2.5/weather';

const PLACEHOLDER_API_URL =
    'https://jsonplaceholder.typicode.com/posts';


// ========================================
// GLOBAL STATE
// ========================================

let savedLocations = [];


// ========================================
// DOM LOADED
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // TAB NAVIGATION
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {

        tab.addEventListener('click', () => {

            const tabId = tab.dataset.tab;

            // REMOVE ACTIVE
            tabs.forEach(t => t.classList.remove('active'));

            document
                .querySelectorAll('.tab-content')
                .forEach(content => {
                    content.classList.remove('active');
                });

            // ADD ACTIVE
            tab.classList.add('active');

            document
                .getElementById(`${tabId}-tab`)
                .classList.add('active');
        });
    });


    // GET WEATHER
    document
        .getElementById('get-weather')
        .addEventListener('click', getWeather);


    // SAVE LOCATION
    document
        .getElementById('save-location')
        .addEventListener('click', saveLocation);


    // UPDATE LOCATION
    document
        .getElementById('update-location')
        .addEventListener('click', updateLocation);


    // CANCEL EDIT
    document
        .getElementById('cancel-edit')
        .addEventListener('click', () => {

            document
                .getElementById('edit-modal')
                .style.display = 'none';
        });


    // LOAD SAMPLE DATA
    fetchSavedLocations();
});


// ========================================
// RESPONSE INFO
// ========================================

function displayResponseInfo(method, url, status, data) {

    const responseInfo =
        document.getElementById('response-info');

    responseInfo.textContent = `
Method: ${method}

URL: ${url}

Status: ${status}

Time: ${new Date().toLocaleString()}

Response:
${JSON.stringify(data, null, 2)}
    `;
}


// ========================================
// GET WEATHER
// ========================================

async function getWeather() {

    const city =
        document.getElementById('city-input')
        .value
        .trim();

    if (!city) {

        alert('Please enter a city name');

        return;
    }

    const weatherResult =
        document.getElementById('weather-result');

    weatherResult.innerHTML =
        '<p>Loading weather data...</p>';

    try {

        const url =
            `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        displayResponseInfo(
            'GET',
            url.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'),
            response.status,
            data
        );

        if (!response.ok) {

            throw new Error(
                data.message || 'Weather data not found'
            );
        }

        weatherResult.innerHTML = `
            <div class="weather-card">

                <h3>${data.name}, ${data.sys.country}</h3>

                <p>
                    <strong>Weather:</strong>
                    ${data.weather[0].main}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${data.weather[0].description}
                </p>

                <p>
                    <strong>Temperature:</strong>
                    ${data.main.temp}°C
                </p>

                <p>
                    <strong>Feels Like:</strong>
                    ${data.main.feels_like}°C
                </p>

                <p>
                    <strong>Humidity:</strong>
                    ${data.main.humidity}%
                </p>

                <p>
                    <strong>Wind Speed:</strong>
                    ${data.wind.speed} m/s
                </p>

            </div>

            <button id="quick-save"
                style="background-color:#27ae60;">

                Save This Location

            </button>
        `;

        // QUICK SAVE
        document
            .getElementById('quick-save')
            .addEventListener('click', () => {

                document.getElementById('location-name').value =
                    `Weather in ${data.name}`;

                document.getElementById('location-city').value =
                    data.name;

                document.getElementById('location-country').value =
                    data.sys.country;

                document.getElementById('location-notes').value =
                    `Temp: ${data.main.temp}°C`;

                // SWITCH TAB
                document
                    .querySelector('.tab[data-tab="post"]')
                    .click();
            });

    } catch (error) {

        weatherResult.innerHTML = `
            <div class="weather-card"
                style="border-left-color:#e74c3c;">

                <h3>Error</h3>

                <p>${error.message}</p>

            </div>
        `;
    }
}


// ========================================
// SAVE LOCATION (POST)
// ========================================

async function saveLocation() {

    const name =
        document.getElementById('location-name')
        .value
        .trim();

    const city =
        document.getElementById('location-city')
        .value
        .trim();

    const country =
        document.getElementById('location-country')
        .value
        .trim();

    const notes =
        document.getElementById('location-notes')
        .value
        .trim();

    if (!name || !city) {

        alert('Please enter location name and city');

        return;
    }

    try {

        const locationData = {

            title: name,

            body: JSON.stringify({
                city,
                country,
                notes
            }),

            userId: 1
        };

        const response = await fetch(
            PLACEHOLDER_API_URL,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(locationData)
            }
        );

        const data = await response.json();

        displayResponseInfo(
            'POST',
            PLACEHOLDER_API_URL,
            response.status,
            data
        );

        const savedLocation = {

            id: data.id,

            name,
            city,
            country,
            notes
        };

        savedLocations.push(savedLocation);

        renderSavedLocations();

        // CLEAR FORM
        document.getElementById('location-name').value = '';
        document.getElementById('location-city').value = '';
        document.getElementById('location-country').value = '';
        document.getElementById('location-notes').value = '';

        alert('Location saved successfully!');

        document
            .querySelector('.tab[data-tab="saved"]')
            .click();

    } catch (error) {

        alert(error.message);
    }
}


// ========================================
// LOAD SAVED LOCATIONS
// ========================================

async function fetchSavedLocations() {

    try {

        const response = await fetch(
            `${PLACEHOLDER_API_URL}?userId=1`
        );

        const data = await response.json();

        savedLocations = data.slice(0, 5).map(item => {

            return {

                id: item.id,

                name: item.title,

                city: 'Unknown City',

                country: '',

                notes: item.body
            };
        });

        renderSavedLocations();

    } catch (error) {

        console.error(error);
    }
}


// ========================================
// RENDER SAVED LOCATIONS
// ========================================

function renderSavedLocations() {

    const container =
        document.getElementById('saved-locations');

    if (savedLocations.length === 0) {

        container.innerHTML =
            '<p>No saved locations.</p>';

        return;
    }

    container.innerHTML = savedLocations.map(location => `

        <div class="location-item">

            <h3>${location.name}</h3>

            <p>
                <strong>City:</strong>
                ${location.city}
            </p>

            <p>
                <strong>Country:</strong>
                ${location.country || 'N/A'}
            </p>

            <p>
                <strong>Notes:</strong>
                ${location.notes || 'None'}
            </p>

            <div class="location-actions">

                <button class="btn-edit"
                    onclick="editLocation(${location.id})">

                    Edit

                </button>

                <button class="btn-delete"
                    onclick="deleteLocation(${location.id})">

                    Delete

                </button>

            </div>

        </div>

    `).join('');
}


// ========================================
// EDIT LOCATION
// ========================================

function editLocation(id) {

    const location =
        savedLocations.find(loc => loc.id === id);

    if (!location) return;

    document.getElementById('edit-id').value =
        location.id;

    document.getElementById('edit-name').value =
        location.name;

    document.getElementById('edit-city').value =
        location.city;

    document.getElementById('edit-country').value =
        location.country;

    document.getElementById('edit-notes').value =
        location.notes;

    document.getElementById('edit-modal')
        .style.display = 'block';
}


// ========================================
// UPDATE LOCATION (PUT)
// ========================================

async function updateLocation() {

    const id =
        document.getElementById('edit-id').value;

    const updatedLocation = {

        name:
            document.getElementById('edit-name').value,

        city:
            document.getElementById('edit-city').value,

        country:
            document.getElementById('edit-country').value,

        notes:
            document.getElementById('edit-notes').value
    };

    try {

        const response = await fetch(
            `${PLACEHOLDER_API_URL}/${id}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(updatedLocation)
            }
        );

        const data = await response.json();

        displayResponseInfo(
            'PUT',
            `${PLACEHOLDER_API_URL}/${id}`,
            response.status,
            data
        );

        const index =
            savedLocations.findIndex(
                loc => loc.id == id
            );

        savedLocations[index] = {

            id: parseInt(id),

            ...updatedLocation
        };

        renderSavedLocations();

        document.getElementById('edit-modal')
            .style.display = 'none';

        alert('Location updated successfully!');

    } catch (error) {

        alert(error.message);
    }
}


// ========================================
// DELETE LOCATION
// ========================================

async function deleteLocation(id) {

    const confirmDelete =
        confirm('Delete this location?');

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `${PLACEHOLDER_API_URL}/${id}`,
            {
                method: 'DELETE'
            }
        );

        displayResponseInfo(
            'DELETE',
            `${PLACEHOLDER_API_URL}/${id}`,
            response.status,
            {
                message: 'Deleted successfully'
            }
        );

        savedLocations =
            savedLocations.filter(
                loc => loc.id !== id
            );

        renderSavedLocations();

        alert('Location deleted successfully!');

    } catch (error) {

        alert(error.message);
    }
}