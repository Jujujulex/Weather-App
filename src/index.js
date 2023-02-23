let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let time = document.querySelector("#time");
time.innerHTML = `${day} ${hours}:${minutes}`;

//this function fetches the city in the search input then deliver it to function(weather)
function search(event) {
  event.preventDefault();
  let apiKey = "40305f3309a7ac55bca48e8adec8ae7a";
  let searchInput = document.querySelector("#exampleInputEmail1").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(weather);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);
//this funtion uses the data fetched from above to rewrite innerhtmls
function weather(response) {
  document.querySelector("#town").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let defaultTemperature = document.querySelector("#temp");
  defaultTemperature.innerHTML = `${temperature}°C`;
  let windSpeed = document.querySelector(".wind");
  let currentWind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${currentWind}km/h`;
  let weatherDescription = document.querySelector(".description");
  let detail = response.data.weather[0].description;
  weatherDescription.innerHTML = `${detail}`;
}
//this function fetches the location of your device by default
function searchLocation(position) {
  let apiKey = "40305f3309a7ac55bca48e8adec8ae7a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#orange-button");
currentLocation.addEventListener("click", getLocation);
