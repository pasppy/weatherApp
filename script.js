function kelvinToCelcius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function mpsTomph(data) {
    return Math.round(data / 0.477);
}

let iconCode = "";
let iconURL;
let icon = document.querySelector("#big-temp-info #icon")
let minTemp = document.getElementById("min-temp");
let maxTemp = document.getElementById("max-temp");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let windSpeed = document.getElementById("wind-speed");
let cityName = document.getElementById("city-name");
let temp = document.getElementById("temp");
let weatherDesc = document.getElementById("desc");
let cityInput;
let searchError = document.getElementById("invalid-city-error");
let input = document.getElementById("search");

let loader = document.getElementById("loader");

document.querySelector("#search-btn").addEventListener("click", () => {
    loader.style.opacity = 1;
    cityInput = input.value.trim();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=b4a5a8a1942f098e30cea98fe2b1a6ef`)
        .then(resolve => resolve.json())
        .then(data => {
            loader.style.opacity = 0;

            searchError.style.display = "none";

            if (data.cod == 404 || data.cod == 400) {
                searchError.style.display = "block";
                document.getElementById("no-info").style.display = "flex";

                document.getElementById("info").style.display = "none";
            }
            iconCode = data.weather[0].icon;
            iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            icon.src = iconURL;
            cityName.innerText = data.name;
            temp.innerText = kelvinToCelcius(data.main.temp);
            weatherDesc.innerText = data.weather[0].main;
            minTemp.innerText = kelvinToCelcius(data.main.temp_min)
            maxTemp.innerText = kelvinToCelcius(data.main.temp_max)
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;
            windSpeed.innerText = mpsTomph(data.wind.speed);

            document.getElementById("no-info").style.display = "none";

            document.getElementById("info").style.display = "grid";

            input.value = "";
        })
        .catch(error => {
            console.log(error)
            loader.style.opacity = 0;

        });
})



