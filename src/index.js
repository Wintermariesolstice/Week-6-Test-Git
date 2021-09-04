function formatDate(date) {
  let currentDate = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedDate = `${day}, ${month} ${currentDate} ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

//Temperature

let fTemp = document.querySelector("#fahrenheit");
let cTemp = document.querySelector("#celcius");

function changeC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round((currentTemp.innerHTML - 32) * (5 / 9));
  fTemp.classList.remove("active");
  cTemp.classList.add("active");
}

function changeF(event) {
  event.preventDefault();

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(currentTemp.innerHTML * (9 / 5) + 32);
  fTemp.classList.remove("active");
  cTemp.classList.add("active");
}

fTemp.addEventListener("click", changeF);

cTemp.addEventListener("click", changeC);

// Geolocation

function showCity(response) {
  response.preventDefault();
  let currentCity = response.data.name.trim().toUpperCase();
  let city = document.querySelector("#current-location");
  city.innerHTML = `${currentCity}`;

  getTemp(response);

  axios.get(
    "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=f52dedcfed529b707b010fce06f7015f"
  );
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `f52dedcfed529b707b010fce06f7015f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCity);
}

function handleGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleGeolocation);

//weather code

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let apiKey = `f52dedcfed529b707b010fce06f7015f`;
  let city = searchInput.value.trim().toUpperCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let location = document.querySelector("#current-location");
  location.innerHTML = `${city}`;
  axios.get(apiUrl).then(getTemp);
}

let button = document.querySelector("#search-button");
button.addEventListener("click", search);

function getTemp(response) {
  let selectedCity = document.querySelector("#current-location");
  let searchInput = response.data.name;
  selectedCity.innerHTML = searchInput;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description.trim();
  let currentTemp = Math.round(response.data.main.temp);
  let newDegreeTemp = document.querySelector("#current-temp");
  newDegreeTemp.innerHTML = `${currentTemp}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}

//location button

function location(event) {
  event.preventDefault();

  let apiKey = `f52dedcfed529b707b010fce06f7015f`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
  let location = document.querySelector("#current-location");
  location.innerHTML = `London`;
  axios.get(apiUrl).then(getTemp);
}

function locationChange(response) {
  let selectedCity = document.querySelector("#current-location");
  let defaultCity = "London";
  selectedCity.innerHTML = defaultCity;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description.trim();
  let currentTemp = Math.round(response.data.main.temp);
  let newDegreeTemp = document.querySelector("#current-temp");
  newDegreeTemp.innerHTML = `${currentTemp}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", location);
