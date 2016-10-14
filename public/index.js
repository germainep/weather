var location = function(){
  navigator.geolocation.getCurrentPosition(function(location) {
    return location;
  });
};

console.log(location());