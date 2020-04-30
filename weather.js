const API_KEY = "c5622150f87199fb56bf1d8f828af715";
const LS_COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerHTML = `${place} <br> ${temperature}ºC`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(LS_COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("I cant collect local information.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const coords = localStorage.getItem(LS_COORDS);
  if (coords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(coords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

loadCoords();
