window.onload = function() { 
	var xhr = new XMLHttpRequest();
	var loc = {
			lat: Number,
			lon: Number
	};
	//declare variables for data display
	var icon = document.querySelector('.js-icon');
	var temp = document.querySelector('.js-temp');
	var city = document.querySelector('.js-city');
	var zipCode = document.querySelector('.js-zipcode');
	var unit = 'imperial';

	function sucess(data) {
		loc.lat = data.coords.latitude;
		loc.lon = data.coords.longitude;
		xhr.open("GET", "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + loc.lat + "&lon=" + loc.lon + "&appid=b65d23ddb6a5e9ea11ce2bfe5f5ebedd&units=" + unit, true);
		xhr.onload = function() {
			let data = JSON.parse(xhr.responseText);
			console.log(data);
			temp.innerHTML = Math.round(data.main.temp) + "&deg;";
			city.textContent = data.name;
			console.log(icon);
			icon = data.main.icon;
		}
		xhr.send();
	}

navigator.geolocation.getCurrentPosition(sucess);
};