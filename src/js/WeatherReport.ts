export class WeatherReport{
    private weatherURL:string = 'http://api.openweathermap.org/data/2.5/';
    private weatherAPIkey:string = '52fdffe71bc574b909919a242643f2db';
    private currentWeatherPath:string = 'weather/';
    private weatherForecastPath:string = 'forecast/daily/';

    private url:string = this.weatherURL + this.currentWeatherPath + "?lat=55.65&lon=12.083333&apikey=" + this.weatherAPIkey;

    async GetWeatherData():Promise<string>{
        return fetch(this.url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            return json;
        });
    }

    async DeserialiseWeatherData(json:string):Promise<void>{
        //let data:string[] = json.split()
    }

    async UpdateWeatherData():Promise<void>{
        let MainPageOutsideHumidityValue:HTMLElement = document.getElementById("outsideHumidityValue");
    }
}