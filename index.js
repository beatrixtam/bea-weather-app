let currentDate = new Date();

function formatDate(date) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	let hours = date.getHours();
	let minutes = date.getMinutes();

	let now = `${day} ${hours}:${minutes}`;

	return now;
}

let getDate = document.querySelector("#date-time");
getDate.innerHTML = formatDate(currentDate);

function displayTemperature(response) {
	let currentTemp = Math.round(response.data.main.temp);
	let tempNow = document.querySelector("#temperature-now");
	tempNow.innerHTML = currentTemp;

	function changeCelsius() {
		let celsiusTemp = document.querySelector("#temperature-now");
		celsiusTemp.innerHTML = currentTemp;
	}

	let chooseCelsius = document.querySelector("#celsius");
	chooseCelsius.addEventListener("click", changeCelsius);

	function changeFahrenheit() {
		let fahrenheitTemp = document.querySelector("#temperature-now");
		fahrenheitTemp.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
	}

	let chooseFahrenheit = document.querySelector("#fahrenheit");
	chooseFahrenheit.addEventListener("click", changeFahrenheit);
}

function searchCity(event) {
	event.preventDefault();
	let newCity = document.querySelector("#search-city");
	let cityTitle = document.querySelector("#city-heading");
	let cityName = newCity.value;

	if (cityName) {
		cityTitle.innerHTML = `${newCity.value}`;
	} else {
		event.preventDefault();
	}
	let apiKey = "ca40b820105beb53b92d32a2aebf57bb";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

let changeCity = document.querySelector("#search-bar");
changeCity.addEventListener("submit", searchCity);

function showTemperature(response) {
	let localTemp = Math.round(response.data.main.temp);
	let local = document.querySelector("#temperature-now");
	let localCity = document.querySelector("#city-heading");
	local.innerHTML = localTemp;
	localCity.innerHTML = response.data.name;

	function changeCel() {
		let celTemp = document.querySelector("#temperature-now");
		celTemp.innerHTML = localTemp;
	}

	let chooseCel = document.querySelector("#celsius");
	chooseCel.addEventListener("click", changeCel);

	function changeFah() {
		let fahTemp = document.querySelector("#temperature-now");
		fahTemp.innerHTML = Math.round((localTemp * 9) / 5 + 32);
	}

	let chooseFah = document.querySelector("#fahrenheit");
	chooseFah.addEventListener("click", changeFah);
}

function showPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "ca40b820105beb53b92d32a2aebf57bb";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
}

function cityNow() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("button");
currentCity.addEventListener("click", cityNow);
