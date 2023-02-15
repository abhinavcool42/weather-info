let weather = {
    api_key: "a457a45b8aa5de206c4025856037b2ab",
    fetchWeather: function (city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.api_key
    )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: (data) => {
    var { cod, message } = data;

    if (cod == "404") {
        document.querySelector(".location").innerText = "Location Not Found ⚠️";
        return;
    }

    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity} = data.main;
    var { speed, deg } = data.wind;
    var { country } = data.sys;
    var { visibility } = data;
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    var d = new Date();
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".date-dayname").innerText = day;
    document.querySelector(".date-day").innerText = date + " " + month + " " + year;
    document.querySelector(".location").innerText =
        name + ", " + country;


    document.querySelector(".icon").src = "assets/icons/" + icon + ".svg";
    
    
    document.querySelector(".weather-desc").innerText = description;
    document.querySelector(".humidity").querySelector(".value").innerText = humidity + "%";
    document.querySelector(".weather-temp").innerText = temp + "°C";
    document.querySelector(".wind").querySelector(".value").innerText =
        deg + "°, " + speed + " KM/H";
    document.querySelector(".visibility").querySelector(".value").innerText =
        visibility / 1000 + " KM";

    document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + ")";
    
    document.querySelector(".weather-card").style.backgroundImage = "url('https://source.unsplash.com/800x900/?" + description + ")";
    },
    
    search: function () {
    this.fetchWeather(document.querySelector(".search-box").value);
    }
};

document.querySelector(".search-box")
.addEventListener("keypress", function (e) {
    if (e.which === 13) weather.search();
});

document.querySelector(".location-button")
.addEventListener("click", function () {
    weather.search();
});

weather.fetchWeather("delhi");