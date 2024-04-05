const API_KEY2 = `at_vpcV0cNDJefS0SrnK7AZbx365vtJJ`;
const API_KEY = `6e7e46fc9dcb2ae98092326d157f3479`;
let weather = document.querySelector(".weather");

renderSearch();

async function getIp() {
  let API2 = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY2}`;
  try {
    let res = await fetch(API2);
    if (!res.ok) {
      data = await res.json();
      renderError(data);
      throw new Error(res.status);
    }
    data = await res.json();
    getDataCoordinates(
      (latitude = data.location.lat),
      (longitude = data.location.lng)
    );
  } catch (err) {
    console.log(err);
  }
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    getDataCoordinates(latitude, longitude);
  },
  (err) => {
    getIp();
    console.log(err);
  }
);

async function getDataCoordinates(latitude, longitude) {
  let API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  try {
    let res = await fetch(API);
    if (!res.ok) {
      data = await res.json();
      renderError(data);
      throw new Error(res.status);
    }
    data = await res.json();
    renderResult(data);
  } catch (err) {
    console.log(err);
  }
}

async function getData(city) {
  let API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    let res = await fetch(API);
    console.log(res);
    if (!res.ok) {
      data = await res.json();
      renderError(data);
      throw new Error(res.status);
    }
    data = await res.json();
    renderResult(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

//отрисовка ошибки
function renderError(data) {
  weather.innerHTML = `<div class="main__error">
  <p>Ooops. Something went wrong.</p>
  <a href="#">Error info</a>
  <input class="again" type="submit" value="Try again" />
  </div>`;
  let btn = weather.querySelector(".again");
  btn.addEventListener("click", function () {
    renderSearch();
  });
}

//отрисовка инпута(главной страницы)
function renderSearch() {
  weather.innerHTML = `
  <form class="form" action="">
  <input class="input" type="text" placeholder="Type your city here" />
  <input class="find" type="submit" value="Find" />
  </form>
  `;

  const form = weather.querySelector(".form");
  const input = weather.querySelector(".input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    getData(input.value);
  });
}

//отрисовка поискового запроса
function renderResult(data) {
  weather.innerHTML = `<div class="main">
  <p class="temp">${Math.round(data.main.temp)}℃</p>
  <p class="country">${data.name}</p>
  <button type="button" class="change">Chage city</button>
  </div>`;

  let btn = weather.querySelector(".change");
  btn.addEventListener("click", function () {
    renderSearch();
  });
}
