import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

export class WeatherReport{
    private weatherURL:string = 'http://api.openweathermap.org/data/2.5/';
    private weatherAPIkey:string = '52fdffe71bc574b909919a242643f2db';
    private currentWeatherPath:string = 'weather/';
    private weatherForecastPath:string = 'forecast/daily/';

    private url:string = this.weatherURL + this.currentWeatherPath + "?lat=55.65&lon=12.083333&units=metric&apikey=" + this.weatherAPIkey;

    //async GetWeatherData():Promise<string>{
        //return fetch(this.url)
        //.then(function(response){
        //    return response.json();
        //})
        //.then(function(json){
        //    return json;
        //});
    //}

    GetWeatherData():void{
        let mainPageThirdPartyLastUpdated:HTMLElement = document.getElementById("thirdPartyLastUpdated");
        axios.get(this.url)
        .then(function(response: AxiosResponse<WeatherObject>):void{
            console.log(response);
            
            let mainPageOutsideHumidityValue:HTMLElement = document.getElementById("outsideHumidityValue");
            let mainPageOutsideTemperatureValue:HTMLElement = document.getElementById("outsideTemperatureValue");
            let weatherReport:WeatherObject = response.data; 

            mainPageOutsideHumidityValue.innerText = weatherReport.main.humidity.toString() + "%";
            mainPageOutsideTemperatureValue.innerText = weatherReport.main.temp.toString() + "°C";
            mainPageThirdPartyLastUpdated.innerText = "Last updated: " + new Date().getHours() + ":" + new Date().getMinutes();
        })
        .catch(function(error: AxiosError):void{
            console.log(error);
            mainPageThirdPartyLastUpdated.innerText = "Last update was unsuccesful.";
        })
    }
}

interface WeatherObject{
    base:string;
    clouds:clouds;
    cod:number;
    coord:coord;
    dt:number;
    id:number;
    main:main;
    name:string;
    sys:sys;
    timezone:number;
    visibility:number;
    weather:weather[];
    wind:wind;
}

interface clouds{
    all:number;
}
interface coord{
    lat:number;
    lon:number;
}
interface main{
    feels_like:number;
    humidity:number;
    pressure:number;
    temp:number;
    temp_max:number;
    temp_min:number;
}
interface sys{
    country:string;
    id:string;
    sunrise:number;
    sunset:number;
    type:number;
}
interface weather{
    description:string;
    icon:string;
    id:number;
    main:string;
}
interface wind{
    deg:number;
    speed:number;
}