"use-strict";

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=2f3ccdf848572e96832c84f31431d427&units=metric`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);

      const location = weatherData.name;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const img = weatherData.weather[0].icon;

      const imgURL = `https://openweathermap.org/img/wn/${img}@2x.png`;

      console.log(temp, weatherDescription);

      res.write(
        `<h1>The Temperature of ${location} is ${temp} Degree Celcius.</h1>`
      );
      res.write(`<p>The Weather is Currently ${weatherDescription}`);
      res.write(`<br><img src="${imgURL}" alt="Weather Condition">`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server Is Running On Port 3000");
});
