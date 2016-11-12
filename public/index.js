window.onload = function () {
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
		var unitSel = document.querySelector('input[type=checkbox]');
    var btn = document.querySelector('.js-location');

    //sets unit to fahrenheit by default
    var unit = 'imperial';

  //event listeners
	zipCode.addEventListener('keypress', getByZip);

  btn.addEventListener('click', tiggerGeoLoc);

	unitSel.addEventListener('click', changeUnit);

  function getByZip() {
		if(event.which === 13){
			var zip = this.value;
			getWeather('https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?zip=' + zip +',us&appid=b65d23ddb6a5e9ea11ce2bfe5f5ebedd&units=' + unit);
			this.value = '';
		}
	}

  function tiggerGeoLoc() {
    if(!btn.classList.toggle('disabled')) {
      navigator.geolocation.getCurrentPosition(sucess);
    }
  }

	function changeUnit(){
		if(!unitSel.checked){
			unit = 'imperial';
			temp.textContent = Math.round(parseInt(temp.textContent) * 1.8) + 32;
		} else {
			unit = 'metric';
			temp.textContent = Math.round((parseInt(temp.textContent) - 32) / 1.8);
		}
	}

	function getWeather(url){
		xhr.open('GET', url, true);
			 xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            temp.textContent = Math.round(data.main.temp);
            city.textContent = data.name;
            icon.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/249533/" + data.weather[0].icon + ".svg";
        };
        xhr.send();
		}

    function sucess(data) {
        loc.lat = data.coords.latitude;
        loc.lon = data.coords.longitude;

        getWeather("https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + loc.lat + "&lon=" + loc.lon + "&appid=b65d23ddb6a5e9ea11ce2bfe5f5ebedd&units=" + unit);
		}

};
