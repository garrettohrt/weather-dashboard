var apiKey = "6a7eff456050fd1c3c03b704bec2225b"
var searchButtonEl = document.querySelector("#search-button")
var cityListEl = document.querySelector("city-storage")
var currentCityEl = document.querySelector("#city-name")
var currentTempEl = document.querySelector("#temp")
var currentWindEl = document.querySelector("#wind")
var currentHumidEl = document.querySelector("#humid")
var currentIconEl = document.querySelector("#current-icon")
var searchedCities = []

if (localStorage.getItem("search-history")){
    searchedCities = JSON.parse(localStorage.getItem("search-history"))
} else {
    localStorage.setItem("search-history",JSON.stringify(searchedCities))
}
function getCurrent(cityInput) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial";


    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                currentCityEl.textContent = data.name + " (" + moment().format('M/D/YYYY') + ") ";
                currentTempEl.textContent = "Temp: " + data.main.temp + "\u2109";
                currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
                currentHumidEl.textContent = "Humidity: " + data.main.humidity + "%";
                currentIconEl.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

            })
        }
    })
}

function getForecast(cityInput) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)

                for (var i = 0; i < 5; i++) {
                    var singleDay = data.list[i * 8];
                    var forecastWeather = {
                        date: new Date(singleDay.dt * 1000).toLocaleString(),
                        icon: "http://openweathermap.org/img/wn/" + singleDay.weather[0].icon + "@2x.png",
                        temp: singleDay.main.temp,
                        wind: singleDay.wind.speed,
                        humidity: singleDay.main.humidity
                    }
                    console.log("expected humidity", forecastWeather.humidity)

                    var currentSelector = "#day-" + i;
                    document.querySelector(currentSelector).textContent = forecastWeather.date;
                    currentSelector = "#img-" + i;
                    document.querySelector(currentSelector).src = forecastWeather.icon;
                    currentSelector = "#temp-" + i;
                    document.querySelector(currentSelector).textContent = "Temp: " + forecastWeather.temp + " \u2109";
                    currentSelector = "#wind-" + i;
                    document.querySelector(currentSelector).textContent = "Wind: " + forecastWeather.wind + " MPH"
                    currentSelector = "#hum-" + i;
                    document.querySelector(currentSelector).textContent = "Humidity: " + forecastWeather.humidity + "%";
                }


            })
        }
    })
}

function getWeather(event) {
    event.preventDefault();
    var cityInput = document.querySelector("#cityName").value;
    let cityHistory = JSON.parse(localStorage.getItem("search-history"));
    cityHistory.push(cityInput)
    console.log("city-history", cityHistory);
    localStorage.setItem("search-history", JSON.stringify(cityHistory));
    for (var i = 0; i < cityHistory.length; i++) {
        
    }
    getCurrent(cityInput);
    getForecast(cityInput);
}

searchButtonEl.addEventListener('click', getWeather);




