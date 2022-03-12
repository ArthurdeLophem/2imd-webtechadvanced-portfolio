export default class App {
    constructor(API_KEY) {
        this.API_KEY = API_KEY;
        this.getLocation();
        this.lat = 0;
        this.lng = 0;
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(this.locationSucces.bind(this), this.locationError.bind(this));
    }

    locationSucces(location) {
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        console.log(location);
        this.getWeather();
    }

    locationError(err) {
        console.log(err);
    }

    getWeather() {

        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.lng}&appid=${this.API_KEY}`;
        console.log(url);
        fetch(url).then(response => {
            //console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            let temp = Math.round(data.main.temp);
            let sky = data.weather[0].description;
            let txt = sky + " and " + temp + "°C" + ", time for...";
            let getIcon = data.weather[0].icon
            let weatherIcon = "http://openweathermap.org/img/w/" + getIcon + ".png";
            document.querySelector(".weather").innerHTML = txt;
            document.querySelector(".degrees").innerHTML = temp + "°C";
            document.querySelector(".icon").style.backgroundImage = "url('" + weatherIcon + "')";
            //this.checkweather(data);
            this.getMeal();
        }).catch(err => {
            console.log(err);
        })
    }

    getMeal() {
        let randomizer = Math.floor(Math.random() * 64);
        let url = `https://themealdb.com/api/json/v1/1/filter.php?c=dessert`;
        fetch(url).then(response => {

            console.log(response);
            return response.json();
        }).then(data => {
            let food = data.meals[randomizer];
            let foodname = food.strMeal;
            let thumbnail = food.strMealThumb;

            document.querySelector(".food").innerHTML = foodname;
            document.querySelector(".foodimg").style.backgroundImage = "url('" + thumbnail + "')";
            //console.log(thumbnail);
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }
}