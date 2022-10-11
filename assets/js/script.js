var apiKey = "6a7eff456050fd1c3c03b704bec2225b"
var searchButtonEl = document.querySelector("#search-button")
var cityListEl = document.querySelector("#city-storage")
var currentCityEl = document.querySelector("#city-name")
var currentTempEl = document.querySelector("#temp")
var currentWindEl = document.querySelector("#wind")
var currentHumidEl = document.querySelector("#humid")
var currentIconEl = document.querySelector("#current-icon")
var searchHistory = [];

// This function fetches the current weather and appends the data from response to text content on the page.
function getCurrent(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial";

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

// This function fetches weather for 5 day forecast and appends the data from response to text content on the page.
function getForecast(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                // This for loop steps through the data and gives the value a key
                // Using currentSelector applies the key value as text to the page
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

// Fetch weather for the cityName string
function onSearchHistoryClick(event, cityName) {
    event.preventDefault();

    getCurrent(cityName);
    getForecast(cityName);
}

// Function that accepts city name string and returns a li with a button that has onclick event that fetches weather.
function createSearchHistoryListItem(cityName) {
    let searchBtn = document.createElement("button");
    let li = document.createElement("li");
    searchBtn.textContent = cityName;
    searchBtn.addEventListener("click", (event) => onSearchHistoryClick(event, cityName));
    li.appendChild(searchBtn);

    return li;
}

// Pass the search input's value to the searchHistory array as a string.
// Update local storage to equal searchHistory
// Create a list item for the search input's value.
// Fetch weather for the search input's value
function onSearchSubmit(event) {
    event.preventDefault();
    var cityName = document.querySelector("#cityName").value;
    searchHistory.unshift(cityName);
    console.log("searchHistory", searchHistory);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    var li = createSearchHistoryListItem(cityName);
    cityListEl.insertBefore(li, cityListEl.firstChild);

    getCurrent(cityName);
    getForecast(cityName);
}

// Check if search-history exists in local storage.
// If it does set searchHistory to search-history from local storage then walk through searchHistory and create button and list item and append to cityListEl.
// Otherwise initialize local storage.
if (localStorage.getItem("search-history")) {
    searchHistory = JSON.parse(localStorage.getItem("search-history"));
    for (var i = 0; i < searchHistory.length; i++) {
        var li = createSearchHistoryListItem(searchHistory[i]);
        cityListEl.appendChild(li);
    }
} else {
    localStorage.setItem("search-history", "");
}

searchButtonEl.addEventListener('click', onSearchSubmit);




