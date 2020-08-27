//day variables
var currentDate = moment().format("L");
let day1 = moment().add(1, 'day').format('L');
let day2 = moment().add(2, 'day').format('L');
let day3 = moment().add(3, 'day').format('L');
let day4 = moment().add(4, 'day').format('L');
let day5 = moment().add(5, 'day').format('L');
var searchInput = $("searchInput");
var currentDay = $("currentDiv");
var apiKey = "e96dc3bf6b9350e78107e685794c2a31";
const farSym = "\u2109";



$(".card").css("display", "none");

function previousSearches (){
    var storedCities = $('<button>');
    storedCities.text(window.localStorage.getItem("city"));
    storedCities.addClass("list-group-item list-group-item-action p-3 cityBtns");
    $('.searchHistoryDiv').prepend(storedCities);
}

previousSearches();



$("#citySrchBtn").click(function() {
    event.preventDefault();
    let city = $("#searchInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e96dc3bf6b9350e78107e685794c2a31";
    var temperature; 
    var fiveDayTemperature;
    var fiveDayHumidity;


            console.log(city);
    
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response){
        //console.log(response);
        temperature = changeTemp(response.main.temp);
        var humidity = response.main.humidity;
        //console.log(humidity)
        var wind = response.wind.speed;
        var iconCode = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; 
        var img = $(`<img src="${iconUrl}">`)
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        
       

    $(".cityName").text(city + " ("+currentDate+")");
    $(".currentHumidity").text("Humidity: " + humidity + "%");
    $(".currentTemperature").text("Temperature: " + temperature + farSym);
    $(".currentWind").text("Wind Speed: " + wind + " MPH");
    $(".weatherIcon").append(img);
    

    //UV API call
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=e96dc3bf6b9350e78107e685794c2a31&lat="+lat+"&lon="+lon;
        $.ajax({
            url : uvQueryURL,
            method : "GET"
        }).then(function(result){
            //console.log(result);
            var uvIndex = result.value;
            //console.log(uvIndex)
            const uvColors = ['#2ecc71', '#FFC300', '#C70039'];

            if (uvIndex < 3){
                $("#currentUVIndex").css('background-color', uvColors[0]);
            }else if (uvIndex < 6 && uvIndex >=3){
                $("#currentUVIndex").css('background-color', uvColors[1]);
            }else if (uvIndex < 11 && uvIndex >= 6) {
                $("#currentUVIndex").css('background-color', uvColors[2]);
            }
            $("#currentUVIndex").text("UV Index: " + uvIndex)
        })
    
            $('.card').css("display" , "block");
            $('.card').addClass('bg-primary text-white');
            $('#five-day-head').text("Five Day Outlook");
            $('#day1').text(day1);
            $('#day2').text(day2);
            $('#day3').text(day3);
            $('#day4').text(day4);
            $('#day5').text(day5);


            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
            //Five day forecast API call, producing ERROR 400 : BAD REQUEST
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function(result){
                console.log(result);
                var forecastCodes = [result.list[1].weather[0].icon, result.list[2].weather[0].icon, result.list[3].weather[0].icon, result.list[4].weather[0].icon, result.list[5].weather[0].icon];

                console.log(result);

                var imageDivs = [$("#weatherIcon1"), $("#weatherIcon2"), $("#weatherIcon3"), $("#weatherIcon4"), $("#weatherIcon5")];

                for (var i = 0; i < forecastCodes; i++){
                    if (forecastCodes[i] === "01d"){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === "01n"){
                        imageDivs[i].append(img);
                    } else if (forecastCodes === "02d" || forecastCodes[i] === "02n"){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === '03d' || forecastCodes[i] === '03n'){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === '04d' || forecastCodes[i] === '04n'){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === '09d' || forecastCodes[i] === '09n'){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === '10d' || forecastCodes[i] === '10n'){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === '11d' || forecastCodes[i] === '11n'){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === '13d' || forecastCodes[i] === '13n'){
                        imageDivs[i].append(img);
                    } else if (forecastCodes[i] === '50d' || forecastCodes[i] === '50n'){
                        imageDivs[i].append(img);
                    } 
                }
                var humidityDivs = [$("#humidity1"), $("#humidity2"), $("#humidity3"), $("#humidity4"), $("#humidity5")];

                for (var i = 0; i < humidityDivs.length; i++){
                    fiveDayHumidity = result.list[i + 1].main.humidity;
                    humidityDivs[i].text("Humidity : " + fiveDayHumidity + "%");
                }

                var temperatureDivs = [$("#temperature1"), $("#temperature2"), $("#temperature3"), $("#temperature4"), $("#temperature5")];

                for (var i = 0; i < temperatureDivs.length; i++){
                    fiveDayTemps = changeTemp(result.list[i + 1].main.temp);
                    temperatureDivs[i].text("Temperature : " + fiveDayTemps + farSym);
                }
             });

    function changeTemp (kelvin) {
        var temp = parseInt(((kelvin - 273.15) * 1.80 + 32));
        return temp;
    }

    });

    function appendedCities (){
        var previousCities = $('<button>');
        previousCities.val(city);
        previousCities.addClass("list-group-item list-group-item-action p-3 cityBtns");
        $('#searchHistoryDiv').prepend(previousCities);
    };

    function storeSearches (){
        window.localStorage.setItem('city', city);
    }
    storeSearches();
    appendedCities();
});

