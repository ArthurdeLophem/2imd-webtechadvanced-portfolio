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
            response.json();
        })
            .then(data => {
                //console.log(data);
                this.getMeal()
            })
            .catch(err => {
                console.log(err);
            })

    }




}