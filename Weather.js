const WeatherResult = document.getElementById('weatherResult');
const weatherError = document.getElementById('WeatherError');
const CityName = document.getElementById('cityName');

let modal = document.getElementById("myModal");


async function getWeatherData() {
    const city = CityName.value.trim();
    const myapiKey = "2dd9245d15ae0c4c786a8751617d96dd";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=${myapiKey}&q=${city},IN&units=metric#`;
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayWeatherData(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            weatherError.innerHTML = 'Error Or CityName may not exist';
            modal.style.display = "block";
        });
}

function displayWeatherData(data) {
    resetData();
    let weatherData = {
        CityName: data.name,
        Weathericon: data.weather[0].icon,
        WeatherStatus: data.weather[0].main,
        Humidity: data.main.humidity,
        Temperature: data.main.temp,
        Visibility: data.visibility,

    }
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    weatherData.SunriseTime = `${sunrise}`;
    weatherData.SunsetTime = `${sunset}`;
    const iconUrl = `http://openweathermap.org/img/w/${weatherData.Weathericon}.png`;

    const cityData = `
    <div class="container">
    <div class="card">
        <div class="card-body">
            <h2 class="city-name">${weatherData.CityName}</h2>
            <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
            <p><p class="temperature">${weatherData.Temperature} </p> °C<p>
            <p class="weather-status">${weatherData.WeatherStatus}</p>
            
            
        </div>

            <ul class="weather-details">
            <li>
                    <i class="fas fa-tint weather-icon"></i>
                    Humidity: ${weatherData.Humidity}%
            </li>
            <li>
                    <i class="fas fa-eye weather-icon"></i>
                    Visibility: ${weatherData.Visibility} meters
            </li>
            <li>
                    <i class="fas fa-sun weather-icon"></i>
                    Sunrise Time: ${weatherData.SunriseTime}
            </li>
            <li>
                    <i class="fas fa-sunset weather-icon"></i>
                    Sunset Time: ${weatherData.SunsetTime}
            </li>
            </ul>
    </div>
    </div>`;


    document.getElementById('weatherResult').innerHTML = cityData;


};

function resetData() {
    WeatherResult.innerHTML = "";
}

function closeModal() {
    weatherError.innerHTML = "";
    modal.style.display = "none";
}