let userLocation = document.querySelector("#location");
let weatherTemp = document.querySelector("#temperature");
let weatherDesc = document.querySelector("#description");
let weatherIcon = document.querySelector("#weatherIcon");
const scale = document.querySelector("#scale");
let currentTime = document.querySelector("#time");
const toggleButton = document.querySelector("#toggle");

const getWeather = () => {
    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            });
        } else {
            userLocation.innerHTML = "Sorry, but your browser does not support Geolocation data";
        }

    const fetchWeather = (lat, long) => {
        const api = "https://fcc-weather-api.glitch.me/api/current?";
        fetch(`${api}lat=${lat}&lon=${long}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
        updateUserData(data.name, data.weather, data.main.temp);
        })
        .catch(err => console.log(err));
    }

    const updateUserData = (location, weather, temp) => {
        const fTemp = `${Math.round((`${temp}` * 9/5)+ 32)}°F`;
        const cTemp = `${temp} °C`;
        let tempSwap = true;
        userLocation.innerHTML = location;
        weatherTemp.innerHTML = fTemp;
        weatherDesc.innerHTML = weather[0].description;
        weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;

        toggleButton.addEventListener("click", toggleTemp);

            function toggleTemp() {
            if (tempSwap === false) {
                weatherTemp.innerHTML = fTemp;
                tempSwap = true;
            } else {
                weatherTemp.innerHTML = cTemp;
                tempSwap = false;
            }
        }
    }
}
    fetchLocation();
}

const setDate = () => {
    const now = new Date();
    const newTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    currentTime.innerHTML = newTime;
}

getWeather();
setInterval(setDate , 1000);



