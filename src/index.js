let savedCities = [];
let currentData;

// Elements
let weatherHeading = document.querySelector("#weather");
let searchInput = document.querySelector("#searchInput");
let saveBtn = document.querySelector("#saveBtn");
let savedUl = document.querySelector("#saved > ul");
let form = document.querySelector("form");
let currentTemp = document.querySelector("#currentTemp");
let currentCon = document.querySelector("#currentCon");

// Listeners

form.addEventListener("submit", (event) => {
  event.preventDefault();

  getWeather(searchInput.value);

  searchInput.value = "";
});

saveBtn.addEventListener("click", () => {
  if (!savedCities.includes(currentData.name)) {
    updateSavedCities(currentData.name);
  }
});

// Functions

function updateSavedCities(name) {
  savedCities.push(name);
  let li = document.createElement("li");
  li.textContent = name;
  li.addEventListener("click", () => {
    getWeather(name);
  });
  savedUl.appendChild(li);
}

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={APPID}&units=imperial`
  )
    .then((res) => res.json())
    .then((body) => {
      currentData = body;
      console.log(body)
      currentTemp.textContent = `It is currently ${body.main.temp} in ${body.name}`
      currentCon.textContent = `The condition of the sky is ${body.weather[0].main} today`

      if (body.main.temp > 90) {
        document.body.classList.add("weather-hot");
      } else if (body.main.temp > 85) {
        document.body.classList.add("weather-warm");
      } else {
        document.body.classList.add("weather-normal");
      }

      saveBtn.disabled = false;
    })
    .catch((err) => {
      console.error(err);
      weatherHeading.textContent = err.message;
    });
}
