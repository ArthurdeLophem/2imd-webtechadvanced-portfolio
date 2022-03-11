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
            let txt = "WoW, " + sky + " " + temp + "°C" + ", it's time for...";
            document.querySelector(".weather").innerHTML = txt;
            //this.checkweather(data);
            //this.printWeather();
            this.getMeal();
        }).catch(err => {
            console.log(err);
        })
    }

    getMeal() {
        let url = `https://themealdb.com/api/json/v1/1/random.php`;
        fetch(url).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }
}