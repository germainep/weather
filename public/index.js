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
	var btn = document.querySelector('.js-location');
    var unit = 'imperial';
	
	zipCode.addEventListener('keypress', getByZip);
	
	function changeUnit(){
		
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
	
	function getByZip() {
		if(event.which === 13){
			var zip = this.value;
			getWeather('http://api.openweathermap.org/data/2.5/weather?zip=' + zip +',us&appid=b65d23ddb6a5e9ea11ce2bfe5f5ebedd&units=' + unit);
			this.value= '';
		}
	}
	
	btn.addEventListener('click', function() {
		if(!btn.classList.toggle('disabled')) {
			navigator.geolocation.getCurrentPosition(sucess);
		} 
	});
	
    function sucess(data) {
        loc.lat = data.coords.latitude;
        loc.lon = data.coords.longitude;
  getWeather("https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + loc.lat + "&lon=" + loc.lon + "&appid=b65d23ddb6a5e9ea11ce2bfe5f5ebedd&units=" + unit);
		}
};