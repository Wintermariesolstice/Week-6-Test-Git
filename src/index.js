function formatDate(date) {
  let currentDate = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
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
    "Dec",
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

//weather code

function getTemp(response) {
  let celsiusTemp = document.querySelector("#current-temp");
  let selectedCity = document.querySelector("#current-location");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp.innerHTML = Math.round(response.data.main.temp);
  selectedCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description.trim();
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = formatDate(now);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  currentTemp = response.data.main.temp;
}

//search city

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

//Temperature

function changeC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  currentTemp.innerHTML = Math.round(celsiusTemp);
}

function changeF(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let currentTemp = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeC);

search("London");

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

//location button

function location(event) {
  event.preventDefault();

  let apiKey = `f52dedcfed529b707b010fce06f7015f`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let location = document.querySelector("#current-location");
  location.innerHTML = `London`;
  axios.get(apiUrl).then(getTemp);
}

function locationChange(response) {
  let selectedCity = document.querySelector("#current-location");

  selectedCity.innerHTML = defaultCity;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description.trim();
  let currentTemp = Math.round(response.data.main.temp);
  let newDegreeTemp = document.querySelector("#current-temp");
  newDegreeTemp.innerHTML = `${currentTemp}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", location);

search("London");
