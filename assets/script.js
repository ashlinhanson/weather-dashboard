//day variables
var currentDate = moment().format("L");
var searchInput = $("searchInput");
var currentDay = $("currentDiv");
const farSym = "\u2109";
$("#citySrchBtn").click(getWeather)

$(".card").css("display", "none");

function getWeather(){
    event.preventDefault();
    var city = $("#searchInput").val();
    var apiKey = "e96dc3bf6b9350e78107e685794c2a31";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    var temperature; 
    
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response){
        console.log(response);
        temperature = changeTemp(response.main.temp);
        var humidity = response.main.humidity;
        console.log(humidity)
        var wind = response.wind.speed;
        console.log(wind)
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; 
        var img = $(`<img src="${iconUrl}">`)
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        getUVIndex(lat,lon)
        
       

$(".cityName").append(city + " ("+currentDate+")");
$(".currentHumidity").append("Humidity: " + humidity + "%");
$(".currentTemperature").append("Temperature: " + temperature + farSym);
$(".currentWind").append("Wind Speed: " + wind + " MPH");
$(".weatherIcon").append(img);
})
}
//UV API call
function getUVIndex(lat,lon){
    var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=e96dc3bf6b9350e78107e685794c2a31&lat="+lat+"&lon="+lon;
    $.ajax({
        url : uvQueryURL,
        method : "GET"
    }).then(function(result){
        console.log(result);
        var uvIndex = result.value;
        console.log(uvIndex)

        if (uvIndex <= 3){
            $(".currentUVIndex").addClass("btn-success");
        }else if (uvIndex <= 6){
            $(".currentUVIndex").addClass("btn-warning");
        }else if (uvIndex <= 11) {
            $(".currentUVIndex").addClass("btn-danger");
        }
        $(".currentUVIndex").append("UV Index: " + uvIndex)
    })
}

function changeTemp (kelvin) {
    var temp = parseInt(((kelvin - 273.15) * 1.80 + 32));
    return temp;
}

