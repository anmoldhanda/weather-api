const check_weather_form = document.querySelector(".check-weather-form");
const inputlocation = document.getElementById("inputlocation");
const search_result_city = document.getElementById("search-result-city");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");
const winddegrees = document.getElementById("wind-degrees");
let input_weather_location = false;

const checkweatherdetails = (location) => {
  const networkrequestdetails = {
    // ============================== weather api credentials ==============================
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "your api key",
      "X-RapidAPI-Host": "your api key host",
    },
  };
  let apiurl = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${location}`;
  let getweatherdetails = fetch(apiurl, networkrequestdetails);
  getweatherdetails
    .then((response) => {
      // ========================= if there is no bad request entered by the user then ok otherwise custom text will be printed bad request 400 means something invalid from client side =========================
      if (response.status !== 400) {
        return response.json();
      } else {
        console.log(response.status);
        console.log("invalid request entered");
        temperature.innerHTML = "";
        humidity.innerHTML = "";
        windspeed.innerHTML = "";
        winddegrees.innerHTML = "";
        search_result_city.innerHTML = "Invalid Entry";
      }
    })
    .then((weatherdata) => {
      console.log(weatherdata);
      temperature.innerHTML = weatherdata.temp + "°C";
      humidity.innerHTML = weatherdata.humidity + "%";
      windspeed.innerHTML = weatherdata.wind_speed + "km/h";
      winddegrees.innerHTML = weatherdata.wind_degrees;
      search_result_city.innerHTML = "current weather details of " + location;
    })
    .catch((error) => {
      console.log(error);
    });
};

check_weather_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let locationvalue = inputlocation.value.trim();
  console.log(locationvalue);
  if (locationvalue) {
    // ============================== empty or invalid input text can't be submitted to prevent the api won't send any unnecessary request to the server ==============================
    checkweatherdetails(locationvalue);
    setTimeout(() => {
      check_weather_form.reset();
    }, 5000);
  }
});
