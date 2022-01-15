new Vue({
  el: "#root",
  data: {
    city: "",
    isLoading: false,
    isLoaded: false,

    temp: 0,
    tempMax: 0,
    tempMin: 0,
    weatherMain: "",
    weatherDescription: "",
    icon: "",
    weatherCityName: "",
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      this.isLoaded = false;

      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: this.city,
            units: "metric",
            lang: "ru",
            appid: "94f3e1a9caf95b8d7d23592fbc620914",
          },
        })
        .then((response) => {
          console.log(response.data);

          this.isLoading = false;
          this.isLoaded = true;

          const data = response.data;

          this.temp = data.main.temp;
          this.tempMax = data.main.temp_max;
          this.tempMin = data.main.temp_min;

          this.weatherMain = data.weather[0].main;
          this.weatherDescription = data.weather[0].description;

          this.weatherCityName = data.name;

          this.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        });
    },
    onCurrentLocationPress() {
      this.isLoading = true;
      this.isLoaded = false;

      navigator.geolocation.getCurrentPosition((position) => {
        axios
          .get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              units: "metric",
              lang: "ru",
              appid: "94f3e1a9caf95b8d7d23592fbc620914",
            },
          })
          .then((response) => {
            console.log(response.data);

            const data = response.data;

            this.temp = data.main.temp;
            this.tempMax = data.main.temp_max;
            this.tempMin = data.main.temp_min;

            this.weatherMain = data.weather[0].main;
            this.weatherDescription = data.weather[0].description;

            this.weatherCityName = data.name;

            this.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

            this.isLoading = false;
            this.isLoaded = true;
          });
      });
    },
  },
});
