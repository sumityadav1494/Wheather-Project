const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname +"/index.html")
    
})
app.post("/", function (req, res) {
    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4f30e9460e7c486f04ea8925ac4869de&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            var weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather condition is " + description + "</p>");
            res.write("<h1>The temp of "+query+" is " + temp + "degree celcius</h1>");
            res.write("<img src=" + imgUrl + ">");

        })
    })

})


app.listen(3000, function () {
    console.log("The server is running at port 3000");
})