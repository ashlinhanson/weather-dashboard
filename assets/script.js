//day variables
var currentDate = moment().format("L");
var searchInput = $("searchInput");
var city


$(document).ready(function() {

$("citySrchBtn").click(function(){
    event.preventDefault();
    var city = $("searchInput").val();
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
        var wind = response.main.wind.speed;

        var iconCode = response.weather[0].icon;
    })
}
)



}
) 


// api key url
//http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={e96dc3bf6b9350e78107e685794c2a31}
