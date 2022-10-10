var searchButton = document.querySelector("#search-button")
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial"

var cityName = document.querySelector("#cityName")

fetch(apiUrl).then(function(response) {
if (response.ok) {
    response.json().then(function (data) {
     console.log(data)
    })
}
})
    var futApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Minneapolis&appid=6a7eff456050fd1c3c03b704bec2225b&units=imperial"

    fetch(futApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log (data)
            })
        }
    })