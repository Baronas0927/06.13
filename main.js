document.querySelector("#submit").addEventListener("click", searchCity);

function searchCity(e){
    e.preventDefault();
    let city = document.querySelector("#city");
    callApi(city.value);
}

function callApi(city){
    let url = "https://api.meteo.lt/v1/places/" + city + "/forecasts/long-term";
    console.log(url);
    fetch(url)
    .then(response => {return response.json(); })
    .then(data => {printData(data) })
} 
function printData(data) {
    printTime(data);
    printAdministrativeDivision(data);
    printWeather(data);
}
function printTime(data){
    document.querySelector("#p1").innerText = data.forecastTimestamps[0].forecastTimeUtc;
}

function printAdministrativeDivision(data){
    document.querySelector("#p2").innerText = data.place.administrativeDivision;
}

function printWeather(data) {
    let date = new Date();
    let curDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0); // create a Date object with the current date and time
    curDate = curDate.toISOString(); // convert to UTC timestamp string

    for (let i = 0; i < data.forecastTimestamps.length; i++) {
        const forecast = data.forecastTimestamps[i];
        if (curDate === forecast.forecastTimeUtc) {
            console.log("radau");
            break;
        }
    }
}