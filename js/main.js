// current
var searchInput = document.querySelector(".search-input");
var today = document.getElementById('today');
var todayHeader = document.querySelector('#today .card-header');
var cardCity = document.querySelector('.card-city');
var dayOrNight = document.querySelector('#dayOrNight');
var humidity = document.querySelector(".humidity");
var windSpeed = document.querySelector(".wind-speed");
var windDirection = document.querySelector(".wind-dir");
var weatherDesc = document.querySelector("#weather-desc");
var degree = document.querySelector(".number");

var searchValue = 'cairo';
getCurrentWeatherData();

searchInput.addEventListener('input', function () {
    if (searchInput.value !== "") {
        searchValue = searchInput.value;
    }
    getCurrentWeatherData();
});

async function getCurrentWeatherData() {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=44b3aa144bea45a488a200452252910&q=${searchValue}&days=3&aqi=yes&alerts=no`);
        var data = await response.json();
    } catch (error) {
        console.log(error);
    }
    var date = new Date(data.location.localtime);
    var weekday = date.toLocaleDateString('en-Us', { weekday: 'long' });
    var dayAndMonth = date.toLocaleDateString('en-Us', { day: '2-digit', month: 'long' });
    todayHeader.firstChild.textContent = weekday;
    todayHeader.lastChild.textContent = dayAndMonth;
    cardCity.textContent = data.location.name;
    degree.textContent = data.current.temp_c + "°C";
    dayOrNight.src = "https:" + data.current.condition.icon;
    humidity.textContent = data.current.humidity + "%";
    windSpeed.textContent = data.current.wind_kph + "km/h";
    windDirection.textContent = data.current.wind_dir;
    weatherDesc.textContent = data.current.condition.text;


    var forecastDays = data.forecast.forecastday;
    
    for (var i = 1; i < forecastDays.length ; i++) {

        var dayData = forecastDays[i];
        date = new Date(dayData.date);
        weekday = date.toLocaleDateString('en-Us', { weekday: 'long' });

        document.querySelector(`#day${i + 1} .card-header`).textContent = weekday;
        document.querySelector(`#day${i + 1} .weather-icon`).src = "https:" + dayData.day.condition.icon;
        document.querySelector(`#day${i + 1} .temp-high`).textContent = dayData.day.maxtemp_c + "°C";
        document.querySelector(`#day${i + 1} .temp-low`).textContent = dayData.day.mintemp_c + "°C";
        document.querySelector(`#day${i + 1} .weather-desc`).textContent = dayData.day.condition.text;
    }
}