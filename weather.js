const searchBtn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
  window.navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0143a9ab90de72333d7e11ae611b331&units=metric    ²`;
    fetchAndDisplayData(url);
  });
});

searchBtn.addEventListener("click", async () => {
  try {
    const cityName = document.getElementById("city-data").value;
    if (!cityName) {
      return alert("Empty field is not allowed");
    }

    fetchAndDisplayData(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a0143a9ab90de72333d7e11ae611b331&units=metric
`);
    //displaying html data format
    // const content = await response.text();
    // document.body.innerHTML = content;
  } catch (error) {
    console.log(error);
  }
});

async function fetchAndDisplayData(url) {
  const displayName = document.querySelector("h1");
  const displayTemp = document.querySelector("h2");
  const displayWeather = document.getElementById("description");
  const img = document.querySelector("img");

  const response = await fetch(url);
  //display Data
  if (response.ok) {
    const data = await response.json();
    const { main, name, weather } = data;
    displayName.textContent = name;
    displayTemp.textContent = Math.round(main.temp) + "°C";
    displayWeather.textContent = weather[0].description;
    img.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    document.getElementById("city-data").value = "";

    console.log(data);
  } else {
    alert("Something went wrong");
  }
}
