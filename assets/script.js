var currentDate = moment().format("L");
var searchInput = $("searchInput");
var currentDay = $("currentDiv");
var city = $("#searchInput").val();
// var day1 = moment().add(1, 'day').format('L');
// var day2 = moment().add(2, 'day').format('L');
// var day3 = moment().add(3, 'day').format('L');
// var day4 = moment().add(4, 'day').format('L');
// var day5 = moment().add(5, 'day').format('L');
const farSym = "\u2109";

$("#citySrchBtn").click(getWeather)

function getWeather(){
    event.preventDefault();
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
// //UV API call
// function getUVIndex(lat,lon){
//     var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=e96dc3bf6b9350e78107e685794c2a31&lat="+lat+"&lon="+lon;
//     $.ajax({
//         url : uvQueryURL,
//         method : "GET"
//     }).then(function(result){
//         console.log(result);
//         var uvIndex = result.value;
//         console.log(uvIndex)

//         if (uvIndex <= 3){
//             $(".currentUVIndex").addClass("btn-success");
//         }else if (uvIndex <= 6){
//             $(".currentUVIndex").addClass("btn-warning");
//         }else if (uvIndex <= 11) {
//             $(".currentUVIndex").addClass("btn-danger");
//         }
//         $(".currentUVIndex").append("UV Index: " + uvIndex)
//     })
// }

//         $('.card').css("display" , "block");
//         $('.card').addClass('bg-primary text-white');
//         $('#forecastTitle').text("Five Day Outlook :");
//         $('#day1').text(day1);
//         $('#day2').text(day2);
//         $('#day3').text(day3);
//         $('#day4').text(day4);
//         $('#day5').text(day5);

//     var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=e96dc3bf6b9350e78107e685794c2a31";
//     $.ajax({
//         url : fiveDayUrl,
//         method : "GET"
//     }).then(function(result){
//         console.log(result);
//     });
//         var fiveDayCodes = [result.list[1].weather[0].icon,
//         result.list[2].weather[0].icon,
//         result.list[3].weather[0].icon,
//         result.list[4].weather[0].icon,
//         result.list[5].weather[0].icon];

//         for (var i = 0; i < fiveDayCodes.length; i++){
//             if (fiveDayCodes[i] === '01d'){
//             } else if (fiveDayCodes[i] === '01n'){

//             } else if (fiveDayCodes[i] === '02d' || fiveDayCodes[i] === '02n'){
//             } else if (fiveDayCodes[i] === '03d' || fiveDayCodes[i] === '03n'){
//             } else if (fiveDayCodes[i] === '04d' || fiveDayCodes[i] === '04n'){
//             } else if (fiveDayCodes[i] === '09d' || fiveDayCodes[i] === '09n'){
//             } else if (fiveDayCodes[i] === '10d' || fiveDayCodes[i] === '10n'){
//             } else if (fiveDayCodes[i] === '11d' || fiveDayCodes[i] === '11n'){
//             } else if (fiveDayCodes[i] === '13d' || fiveDayCodes[i] === '13n'){
//             } else if (fiveDayCodes[i] === '50d' || fiveDayCodes[i] === '50n');
//         }
//     var temperatureDivs = [$("#temperature1"), $("#temperature2"), $("#temperature3"), $("#temperature4"), $("#temperature5")];

//     for (var i = 0; i < temperatureDivs.length; i++){
//         fiveDayTemp = changeTemp(result.list[i + 1].main.temp);
//         temperatureDivs.append("Temperature : " + fiveDayTemp + farSym);
//     };

//     var humidityDivs = [$("#humidity1"), $("#humidity2"), $("#humidity3"), $("#humidity4"), $("#humidity5")];

//     for (var i = 0; i < humidityDivs.length; i++){
//         fiveDayHumidity = result.list[i + 1].main.humidity;
//         humidityDivs.append("Humidity : " + fiveDayHumidity);
//     }




// console.log(fiveDay())



// function changeTemp (kelvin) {
//     var temp = parseInt(((kelvin - 273.15) * 1.80 + 32));
//     return temp;
// };

