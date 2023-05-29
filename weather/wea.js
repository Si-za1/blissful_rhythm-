// weather data
var weatherData = [
	{
		timezone: "Birgunj",
		temperature: 40,
		status: "F",
		description: "Sunny",
		icon: "sunny.svg",
	},
	{
		timezone: "Kathmandu",
		temperature: 30,
		status: "F",
		description: "Cloudy",
		icon: "cloudy.svg",
	},
	{
		timezone: "Hetauda",
		temperature: 20,
		status: "F",
		description: "Rainy",
		icon: "rainy.svg",
	},
	{
		timezone: "Bhairahwa",
		temperature: 10,
		status: "F",
		description: "Thunder",
		icon: "thunder.svg",
	},
	{
		timezone: "Jiri",
		temperature: 5,
		status: "F",
		description: "Windy",
		icon: "windy.svg",
	},
	{
		timezone: "Pokhara",
		temperature: 25,
		status: "F",
		description: "Partly Cloudy",
		icon: "cloudy.svg",
	},

	{
		timezone: "Nagarkot",
		temperature: 15,
		status: "F",
		description: "Foggy",
		icon: "foggy.svg",
	},
];

// to convert degrees either F to C or vice versa

var isFahrenheit = true; // since the initial is given as F

//initial weather
displayWeatherData(weatherData[0]);

//variables used
var locationUpdate = document.querySelector(".location-click");

var degreeStatus = document.querySelector(".degree-status");
var degreeElement = document.querySelector(".degree");

//automated changes
var changeRandomWeather = setInterval(updateWeather, 5000);

// to display random weather from the static data
locationUpdate.addEventListener("click", updateWeather);

function updateWeather() {
	if (weatherData.length > 1) {
		var randomIndex = Math.floor(Math.random() * weatherData.length);
		var randomWeather = weatherData[randomIndex];
		weatherData.splice(randomIndex, 1);
		displayWeatherData(randomWeather);
	} else {
		displayWeatherData(weatherData[0]);
	}
}

//for F and C
degreeStatus.addEventListener("click", () => {
	if (isFahrenheit) {
		convertToCelsius();
	} else {
		convertToFahrenheit();
	}
});

//conversion of the degree
function convertToFahrenheit() {
	if (!isFahrenheit) {
		var temperatureC = parseFloat(degreeElement.textContent);
		var temperatureF = (temperatureC * 9) / 5 + 32;
		degreeElement.textContent = temperatureF.toFixed(1);
		degreeStatus.textContent = "F";
		isFahrenheit = true;
	}
}

function convertToCelsius() {
	 
		var temperatureF = parseFloat(degreeElement.textContent);
		var temperatureC = ((temperatureF - 32) * 5) / 9;
		degreeElement.textContent = temperatureC.toFixed(1);
		degreeStatus.textContent = "C";
		isFahrenheit = false;
	
}

// now to displaying weather from the above data
function displayWeatherData(data) {
	document.querySelector(".location-timezone").textContent = data.timezone;
	document.querySelector(".degree").textContent = data.temperature;
	document.querySelector(".degree-status").textContent = data.status;
	document.querySelector(".temperature-description").textContent =
		data.description;
	document.querySelector(".weather-icon").src = data.icon;
}
