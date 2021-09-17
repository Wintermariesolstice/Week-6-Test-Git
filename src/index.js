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
  let currentTemp = document.querySelector("#current-temp");
  let selectedCity = document.querySelector("#current-location");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  selectedCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description.trim();
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = formatDate(now);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//search city

function searchCity(city) {
  let apiKey = `f52dedcfed529b707b010fce06f7015f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value.trim().toUpperCase();

  searchCity(city);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

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
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeC);

// Geolocation

let locationButton = document.querySelector("#location-button");

locationButton.addEventListener("click", searchCity);

let celsiusTemp = null;

searchCity("london");
