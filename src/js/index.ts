import { HumidityReportList } from "./HumidityReportList";
import { Delay } from "./Delay";
import { WeatherReport } from "./WeatherReport";

let humidityReportList = new HumidityReportList();
let weatherReport = new WeatherReport();

let settingsLocationButton:HTMLElement = document.getElementById("settingsLocationButton");
settingsLocationButton.addEventListener('click', () => weatherReport.ChangeLocation());

//console.log(weatherReport.GetWeatherData());
//weatherReport.GetWeatherData();

//humidityReportList.GetAllReports();

(async () => {
    await humidityReportList.GetAllReports(); 
    while(true){
        console.log("Activated at " + new Date().getMinutes());
        humidityReportList.UpdateMainPageHumidity();
        weatherReport.GetWeatherData();

        let currentMinute:number = new Date().getMinutes();
        if(currentMinute % 5 == 0){
            humidityReportList.GetAllReports();
            //humidityReportList.FindLatestReport();
            humidityReportList.UpdateMainPageHumidity();
        }

        console.log("Now sleeping for a minute.")
        //One minute
        await Delay(60000);
    }
})();

let getting3DayList :HTMLElement=<HTMLElement> document.getElementById("3days");
    getting3DayList.addEventListener('click', () => HumidityReportList.HumidityReportFor3Ddays());

    let getting7DayList :HTMLElement=<HTMLElement> document.getElementById("7days");
    getting7DayList.addEventListener('click', () => HumidityReportList.HumidityReportFor7Ddays());

    let getting1DayList :HTMLElement=<HTMLElement> document.getElementById("1day");
    getting1DayList.addEventListener('click', () => HumidityReportList.HumidityReportFor1Dday());