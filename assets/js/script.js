
var Temp = document.querySelector('#Temp');
var Wind = document.querySelector('#Wind');
var Humid = document.querySelector('#Humidity');
var Index = document.querySelector('#Index');
var putBtn = $('#locationBtn');
var $SearchBtn = $('#SearchBtn');
var Input = document.querySelector('#search-city');
var CityName = document.querySelector('#CityName');
let createImg= document.createElement('img');
let createImg2= document.createElement('img');
let createImg3= document.createElement('img');
var cityHistory = $(JSON.parse(localStorage.getItem('saved')));

addEntry();
function addEntry() {
    cityHistory.sort();
    for (var i = 0; i < cityHistory.length; i++){
        if(cityHistory[i] === cityHistory[i -1]){
            cityHistory.splice(i, 1);
            i--;
        }
    }
 BTNCreator();
}

function BTNCreator(){
    putBtn.children().remove();
    for(var i = 0; i <cityHistory.length; i++){
        var btn = document.createElement("button");
        btn.textContent = (cityHistory[i]);
        btn.setAttribute('id', 'Relook');
        document.getElementById('locationBtn').appendChild(btn);
    }
}

$SearchBtn.on('click', function (event) {
    console.log(Input.value);
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + Input.value + '&appid=ec96c3d6509b8a012ba07a86b8f2719b')
        .then(response => response.json())
        .then(data => {
            var CityValue = data['name'];
            var TemperValue = data['main']['temp'];
            var windValue = data['wind']['speed'];
            var HumidValue = data['main']['humidity'];
            var ImgValue = data.weather[0].icon;


            CityName.innerHTML = (CityValue + " ");
            var convertTemp = Math.trunc(1.8 * (TemperValue - 273) + 32);
            Temp.innerHTML = ("Temperature: " + convertTemp + " °F");
            Wind.innerHTML = ("Wind: " + windValue + " mph");
            Humid.innerHTML = ("Humidity: " + HumidValue);


            createImg.src= "http://openweathermap.org/img/wn/" + ImgValue + ".png";
            
            document.getElementById('Index').append(createImg);

            cityHistory.push(CityValue);
            localStorage.setItem('saved', JSON.stringify(cityHistory));
            addEntry(); 
        })



    .catch(err => alert("Wrong city name"))

    // fetch request to get 5-day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + Input.value + '&units=imperial&appid=ec96c3d6509b8a012ba07a86b8f2719b')
        .then(response => response.json())
        .then(data => {
            console.log(data);
                var Icon1 = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon+ '.png';
                $('#Icon1').attr('src', Icon1);
                document.getElementById("Temp1" ).innerHTML = 'Temp: ' + Number(data.list[0].main.temp).toFixed(0) + "°F";
                document.getElementById("Wind1").innerHTML = 'Wind: ' + Number(data.list[0].wind.speed) + " Mph";
                document.getElementById("Humidity1").innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity);
                document.getElementById("Date1").innerHTML = (data.list[0].dt_txt);

                var Icon2 = 'https://openweathermap.org/img/w/' + data.list[8].weather[0].icon+ '.png';
                $('#Icon2').attr('src', Icon2);
                document.getElementById("Temp2" ).innerHTML = 'Temp: ' + Number(data.list[8].main.temp).toFixed(0) + "°F";
                document.getElementById("Wind2").innerHTML = 'Wind: ' + Number(data.list[8].wind.speed) + " Mph";
                document.getElementById("Humidity2").innerHTML = 'Humidity: ' + Number(data.list[8].main.humidity);
                document.getElementById("Date2").innerHTML = (data.list[8].dt_txt);

                var Icon3 = 'https://openweathermap.org/img/w/' + data.list[16].weather[0].icon+ '.png';
                $('#Icon3').attr('src', Icon3);
                document.getElementById("Temp3" ).innerHTML = 'Temp: ' + Number(data.list[16].main.temp).toFixed(0) + "°F";
                document.getElementById("Wind3").innerHTML = 'Wind: ' + Number(data.list[16].wind.speed) + " Mph";
                document.getElementById("Humidity3").innerHTML = 'Humidity: ' + Number(data.list[16].main.humidity);
                document.getElementById("Date3").innerHTML = (data.list[16].dt_txt);

                var Icon4 = 'https://openweathermap.org/img/w/' + data.list[24].weather[0].icon+ '.png';
                $('#Icon4').attr('src', Icon4);
                document.getElementById("Temp4" ).innerHTML = 'Temp: ' + Number(data.list[24].main.temp).toFixed(0) + "°F";
                document.getElementById("Wind4").innerHTML = 'Wind: ' + Number(data.list[24].wind.speed) + " Mph";
                document.getElementById("Humidity4").innerHTML = 'Humidity: ' + Number(data.list[24].main.humidity);
                document.getElementById("Date4").innerHTML = (data.list[24].dt_txt);

                var Icon5 = 'https://openweathermap.org/img/w/' + data.list[32].weather[0].icon+ '.png';
                $('#Icon5').attr('src', Icon5);
                document.getElementById("Temp5" ).innerHTML = 'Temp: ' + Number(data.list[32].main.temp).toFixed(0) + "°F";
                document.getElementById("Wind5").innerHTML = 'Wind: ' + Number(data.list[32].wind.speed) + " Mph";
                document.getElementById("Humidity5").innerHTML = 'Humidity: ' + Number(data.list[32].main.humidity);
                document.getElementById("Date5").innerHTML = (data.list[32].dt_txt);
        })

});


$('#locationBtn').on('click', '#Relook' , function (event) { 
    event.stopPropagation();
    event.stopImmediatePropagation();
     console.log("Clicked");
     var city = $(this).text();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=ec96c3d6509b8a012ba07a86b8f2719b')
    .then(response => response.json())
    .then(data => {
        var CityValue = data['name'];
        var TemperValue = data['main']['temp'];
        var windValue = data['wind']['speed'];
        var HumidValue = data['main']['humidity'];
        var ImgValue = data.weather[0].icon;


        CityName.innerHTML = (CityValue + " ");
        var convertTemp = Math.trunc(1.8 * (TemperValue - 273) + 32);
        Temp.innerHTML = ("Temperature: " + convertTemp + " °F");
        Wind.innerHTML = ("Wind: " + windValue + " mph");
        Humid.innerHTML = ("Humidity: " + HumidValue);


        createImg.src= "http://openweathermap.org/img/wn/" + ImgValue + ".png";
        
        document.getElementById('Index').append(createImg);

        cityHistory.push(CityValue);
        localStorage.setItem('saved', JSON.stringify(cityHistory));
        addEntry(); 
    })



.catch(err => alert("please enter city name"))

// fetch request to get 5-day forecast
fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=ec96c3d6509b8a012ba07a86b8f2719b')
    .then(response => response.json())
    .then(data => {
        console.log(data);
            var Icon1 = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon+ '.png';
            $('#Icon1').attr('src', Icon1);
            document.getElementById("Temp1" ).innerHTML = 'Temp: ' + Number(data.list[0].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind1").innerHTML = 'Wind: ' + Number(data.list[0].wind.speed) + " Mph";
            document.getElementById("Humidity1").innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity);
            document.getElementById("Date1").innerHTML = (data.list[0].dt_txt);

            var Icon2 = 'https://openweathermap.org/img/w/' + data.list[8].weather[0].icon+ '.png';
            $('#Icon2').attr('src', Icon2);
            document.getElementById("Temp2" ).innerHTML = 'Temp: ' + Number(data.list[8].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind2").innerHTML = 'Wind: ' + Number(data.list[8].wind.speed) + " Mph";
            document.getElementById("Humidity2").innerHTML = 'Humidity: ' + Number(data.list[8].main.humidity);
            document.getElementById("Date2").innerHTML = (data.list[8].dt_txt);

            var Icon3 = 'https://openweathermap.org/img/w/' + data.list[16].weather[0].icon+ '.png';
            $('#Icon3').attr('src', Icon3);
            document.getElementById("Temp3" ).innerHTML = 'Temp: ' + Number(data.list[16].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind3").innerHTML = 'Wind: ' + Number(data.list[16].wind.speed) + " Mph";
            document.getElementById("Humidity3").innerHTML = 'Humidity: ' + Number(data.list[16].main.humidity);
            document.getElementById("Date3").innerHTML = (data.list[16].dt_txt);

            var Icon4 = 'https://openweathermap.org/img/w/' + data.list[24].weather[0].icon+ '.png';
            $('#Icon4').attr('src', Icon4);
            document.getElementById("Temp4" ).innerHTML = 'Temp: ' + Number(data.list[24].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind4").innerHTML = 'Wind: ' + Number(data.list[24].wind.speed) + " Mph";
            document.getElementById("Humidity4").innerHTML = 'Humidity: ' + Number(data.list[24].main.humidity);
            document.getElementById("Date4").innerHTML = (data.list[24].dt_txt);

            var Icon5 = 'https://openweathermap.org/img/w/' + data.list[32].weather[0].icon+ '.png';
            $('#Icon5').attr('src', Icon5);
            document.getElementById("Temp5" ).innerHTML = 'Temp: ' + Number(data.list[32].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind5").innerHTML = 'Wind: ' + Number(data.list[32].wind.speed) + " Mph";
            document.getElementById("Humidity5").innerHTML = 'Humidity: ' + Number(data.list[32].main.humidity);
            document.getElementById("Date5").innerHTML = (data.list[32].dt_txt);
    })

});
