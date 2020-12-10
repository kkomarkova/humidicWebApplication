import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { relativeTimeThreshold } from "../../node_modules/moment/ts3.1-typings/moment";

export class WeatherReport{
    private weatherURL:string = 'http://api.openweathermap.org/data/2.5/';
    private weatherAPIkey:string = '52fdffe71bc574b909919a242643f2db';
    private currentWeatherPath:string = 'weather/';
    private weatherForecastPath:string = 'forecast/daily/';

    private latitude:number = 55.65;
    private longitude:number = 12.083333;

    private url:string = this.weatherURL + this.currentWeatherPath + "?lat="+ this.latitude +"&lon="+ this.longitude +"&units=metric&apikey=" + this.weatherAPIkey;

    constructor(){
        this.LoadFromLocal();
    }

    GetWeatherData():void{
        let mainPageThirdPartyLastUpdated:HTMLElement = document.getElementById("thirdPartyLastUpdated");
        axios.get(this.url)
        .then(function(response: AxiosResponse<WeatherObject>):void{
            console.log(response);
            
            let mainPageOutsideHumidityValue:HTMLElement = document.getElementById("outsideHumidityValue");
            let mainPageOutsideTemperatureValue:HTMLElement = document.getElementById("outsideTemperatureValue");
            let mainPageOutsideLocation:HTMLElement = document.getElementById("outsideLocation");
            let settingsLocation:HTMLElement = document.getElementById("settingsCurrentLocation");
            let weatherReport:WeatherObject = response.data; 

            mainPageOutsideHumidityValue.innerText = weatherReport.main.humidity.toString() + "%";
            mainPageOutsideTemperatureValue.innerText = weatherReport.main.temp.toString() + "°C";
            mainPageOutsideLocation.innerText = weatherReport.name + ", " + weatherReport.sys.country;
            settingsLocation.innerText = weatherReport.name + ", " + weatherReport.sys.country;
            mainPageThirdPartyLastUpdated.innerText = "Last updated: " + new Date().getHours() + ":" + new Date().getMinutes();
        })
        .catch(function(error: AxiosError):void{
            console.log(error);
            mainPageThirdPartyLastUpdated.innerText = "Last update was unsuccesful.";
        })
    }

    ChangeLocation():void{
        try{
            this.latitude = +(<HTMLInputElement>document.getElementById("settingsLatitudeInput")).value;
            this.longitude = +(<HTMLInputElement>document.getElementById("settingsLongitudeInput")).value;
        }
        finally{
            this.url = this.weatherURL + this.currentWeatherPath + "?lat="+ this.latitude +"&lon="+ this.longitude +"&units=metric&apikey=" + this.weatherAPIkey;
            this.GetWeatherData();
        }
        this.SaveToLocal();        
    }

    LoadFromLocal(){
        let latitude = window.localStorage.getItem("latitude");
        let longitude = window.localStorage.getItem("longitude");

        if(latitude == null){
            this.latitude = 55.65;
        }
        else{
            this.latitude = parseFloat(latitude);
        }

        if(longitude == null){
            this.longitude = 12.083333;
        }
        else{
            this.longitude = parseFloat(longitude);
        }

        this.url = this.weatherURL + this.currentWeatherPath + "?lat="+ this.latitude +"&lon="+ this.longitude +"&units=metric&apikey=" + this.weatherAPIkey;
    }

    SaveToLocal(){
        window.localStorage.setItem("latitude", this.latitude.toString());
        window.localStorage.setItem("longitude", this.longitude.toString());
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