var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=6a7eff456050fd1c3c03b704bec2225b"

fetch(apiUrl).then(function(response) {
if (response.ok) {
    response.json().then(function (data) {
console.log(data)
    })
}
})