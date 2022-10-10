var apiKey = "6a7eff456050fd1c3c03b704bec2225b"
var searchButtonEl = document.querySelector("#search-button")
var cityListEl = document.querySelector("city-storage")
var currentCityEl = document.querySelector("#city-name")
var currentTempEl = document.querySelector("#temp")
var currentWindEl = document.querySelector("#wind")
var currentHumidEl = document.querySelector("#humid")
var searchedCities = []

function getCurrent(cityInput) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial";

    
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                currentCityEl.textContent = data.name+" (" + moment().format('M/D/YYYY') + ")";
                currentTempEl.textContent = "Temp: "+data.main.temp;
                currentWindEl.textContent = "Wind: "+data.wind.speed+" MPH";
                currentHumidEl.textContent = "Humidity: "+data.main.humidity+"%";
            })
        }
    })
}

function getForecast(cityInput) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityInput+"&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            })
        }
    })
}

function getWeather(event) {
    event.preventDefault();
    var cityInput = document.querySelector("#cityName").value;
    searchedCities.push(cityInput)
    console.log("city-expected", cityInput);
    console.log('searched', searchedCities);
    getCurrent(cityInput);
    getForecast(cityInput);
}

searchButtonEl.addEventListener('click', getWeather);




