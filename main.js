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
        let date = new Date();
    let curDate = date.getFullYear() + "-" +
    (date.getMonth() +1).toString().padStart(2,"0")+ "-" + 
    date.getDate().toString().padStart(2,"0") + " " +
    date.getHours().toString().padStart(2,"0") +":00:00" ; // create a Date object with the current date and time
    // curDate = curDate.toISOString(); // convert to UTC timestamp string

    for (let i = 0; i < data.forecastTimestamps.length; i++) {
        const forecast = data.forecastTimestamps[i];
        console.log(curDate, forecast.forecastTimeUtc);
        if (curDate == forecast.forecastTimeUtc) {
            printTime(data);//2024-06-14 10:00:00
            //printAdministrativeDivision(data);
            dayData(data, i);
            break;
        }
    }
   
}
function printTime(data){
    document.querySelector("#p1").innerText = data.forecastTimestamps[0].forecastTimeUtc;
}

function dayData(data,pos){
        document.querySelector("#p2").innerText = data.place.administrativeDivision;
        document.querySelector("#p3").innerText = data.forecastTimestamps[pos].airTemperature;
        document.querySelector("#p4").innerText = data.forecastTimestamps[pos].feelsLikeTemperature;
        document.querySelector("#p5").innerText = data.forecastTimestamps[pos].windSpeed;
        document.querySelector("#p6").innerText = data.forecastTimestamps[pos].windGust;
        document.querySelector("#p7").innerText = data.forecastTimestamps[pos].windDirection;
        document.querySelector("#p8").innerText = data.forecastTimestamps[pos].cloudCover;
}



