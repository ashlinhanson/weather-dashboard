//day variables
var currentDate = moment().format("L");
var searchInput = $("searchInput");
var currentDay = $("currentDay");
const farSym = "\u2109";


$("citySrchBtn").click(function(){
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

        temperature = convertTemp(response.main.temperature);
        var humidity = response.main.humidity;
        var wind = response.wind.speed;

        var iconCode = response.weather[0].icon;
    })


$(".currentDay").addClass("border border-secondary");
$(".city").text(city + " (" + currentDate + ") ");


$(".humidity").text("Humidity: " + humidity + "%");
$(".temperature").text("Temperature: " + temperature + farSym);
$(".wind").text("Wind Speed: " + wind + " MPH");

})



function convertTemp (kelvin) {
    var temp = Math.floor((kelvin - 273.15) * 1.80 + 32);
    return temp;
}



// api key url
//http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={e96dc3bf6b9350e78107e685794c2a31}
