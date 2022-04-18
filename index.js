const weatherApi = {
    key: "f7211ea13a6efad6c5f7e0c32effff3a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');


searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeather(searchInputBox.value)
    }
});




// get weather
function getWeather(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}


// show weather
function showWeather(weather) {
    console.log(weather); 
    
    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage="url('images/clear.jpg')"
    }
    else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage="url('images/cloud.jpg')"
    }
    else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage="url('images/rain.jpg')"
    }
    else if (weatherType.textContent == 'thunderstorm') {
        document.body.style.backgroundImage="url('images/thunderstorm.jpg')"
    }
    else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage="url('images/Snow.jpg')"
    }
    else if (weatherType.textContent == 'Smoke') {
        document.body.style.backgroundImage="url('images/Smoke.jpg')"
    }
    else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage="url('images/Haze.jpg')"
    }
    else if (weatherType.textContent == 'Drizzle') {
        document.body.style.backgroundImage="url('images/Drizzle.jpg')"
    }
}


// manage date
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "saturday"];
    
    let months = ["January", "February", "March", "april", "May", "June", "July", "August", "Spetember", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`; 
}

// api.openweathermap.org / data / 2.5 / weather ? q = { city name } & appid={API key }
