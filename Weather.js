const WeatherResult = document.getElementById('weatherResult');
const weatherError = document.getElementById('WeatherError');
const CityName = document.getElementById('cityName');

let modal = document.getElementById("myModal");


async function getWeatherData() {
    const city = CityName.value;
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
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${weatherData.CityName}</h5>
                        <p class="card-text">Weather Status: ${weatherData.WeatherStatus}</p>
                        <img src="${iconUrl}" alt="Weather Icon" class="img-fluid mb-3">
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Humidity: ${weatherData.Humidity}%</li>
                        <li class="list-group-item">Temperature: ${weatherData.Temperature} °C</li>
                        <li class="list-group-item">Visibility: ${weatherData.Visibility} meters</li>
                        <li class="list-group-item">Sunrise Time: ${weatherData.SunriseTime}</li>
                        <li class="list-group-item">Sunset Time: ${weatherData.SunsetTime}</li>
                    </ul>
                </div>`;

    document.getElementById('weatherResult').innerHTML = cityData;


};

function resetData() {
    WeatherResult.innerHTML = "";
}

function closeModal() {
    weatherError.innerHTML ="";
    modal.style.display = "none";
}