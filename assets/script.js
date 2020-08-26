//day variables
var currentDate = moment().format("L");
var searchInput = $("searchInput");
var currentDay = $("currentDiv");
const farSym = "\u2109";


$("#citySrchBtn").click(function(){
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

        temperature = changeTemp(response.main.temperature);
        var humidity = response.main.humidity;
        var wind = response.wind.speed;

        var iconCode = response.weather[0].icon;

        var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; 
        
        

       
    


$(".currentDiv").addClass("border");
$(".searchInput").text(searchInput + " (" + currentDate + ") ");

$(".cityName").text(searchInput.val());
$(".currentHumidity").text("Humidity: " + humidity + "%");
$(".currentTemperature").text("Temperature: " + temperature + farSym);
$(".currentWind").text("Wind Speed: " + wind + " MPH");


})

})




function changeTemp (kelvin) {
    var temp = Math.floor((kelvin - 273.15) * 1.80 + 32);
    return temp;
}

