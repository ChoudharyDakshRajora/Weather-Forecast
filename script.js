document.getElementById('search-btn').addEventListener('click', function() {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

async function fetchWeather(location) {
    const apiKey = '96706f98d0d1b7ce6deb8fde7d682a06'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data</p>';
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherCard = `
            <div class="weather-card">
                <h2>${data.name}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
            </div>
        `;
        document.getElementById('weather-info').innerHTML = weatherCard;
    } else {
        document.getElementById('weather-info').innerHTML = `<p>${data.message}</p>`;
    }
}