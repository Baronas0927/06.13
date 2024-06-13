document.querySelector("#submit").addEventListener("click", searchCity);

function searchCity(e){
    e.preventDefault();
    let city = document.querySelector("#city");
    // let administrativeDivision = document.querySelector("#administrativeDivision");
    callApi(city.value);
    // city.value = "";
    // callApi(administrativeDivision.value);
    // administrativeDivision.value = "";
}

function callApi(city,){
    let url = "https://api.meteo.lt/v1/places/" + city + "/forecasts/long-term";
    console.log(url);
    fetch(url)
    .then(response => {return response.json(); })
    .then(data => { printData(data) })
}
function printData(data) {
    printTime(data);
    printAdministrativeDivision(data);
}
function printTime(data){
    document.querySelector("#p1").innerText = data.forecastTimestamps[0].forecastTimeUtc;
    console.log(data.forecastTimestamps[0].forecastTimeUtc);
}

function printAdministrativeDivision(data){
    document.querySelector("#p2").innerText = data.place.administrativeDivision;
    console.log(data.place.administrativeDivision);
}