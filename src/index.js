let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let now = new Date();
let minutes = now.getMinutes();
let hours = now.getHours();
let date = now.getDate();
let year = now.getFullYear();
let h2 = document.querySelector("h2");
let currentDate = document.querySelector("#current-date");
let localTime = document.querySelector("#local-time");

let month = months[now.getMonth()];
let day = days[now.getDay()];
h2.innerHTML = day;
currentDate.innerHTML = `${date} ${month} ${year}`;
localTime.innerHTML = `${hours} : ${minutes}`;

function displayWeather(response) {
    celciusTemperature = response.data.main.temp;
  document.querySelector("#location-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#hum").innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#windy").innerHTML = `${Math.round(
    response.data.wind.speed
  )} Km/h`;
  let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
  let apiKey = "f4b875ee8c569ff5d652a4ac8dd1f320";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "f4b875ee8c569ff5d652a4ac8dd1f320";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#weather-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temp");
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelciusTemperature(event) {
   event.preventDefault();
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

searchCity("Bali");

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", getCurrentLocation);


