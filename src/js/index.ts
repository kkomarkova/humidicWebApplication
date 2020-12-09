import { HumidityReportList } from "./HumidityReportList";
import { Delay } from "./Delay";
import { WeatherReport } from "./WeatherReport";
import { UserPreferences } from "./UserPreferences";

let humidityReportList = new HumidityReportList();
let weatherReport = new WeatherReport();
let userPreferences = new UserPreferences();

let settingsLocationButton:HTMLElement = document.getElementById("settingsLocationButton");
settingsLocationButton.addEventListener('click', () => weatherReport.ChangeLocation());

//console.log(weatherReport.GetWeatherData());
//weatherReport.GetWeatherData();
//humidityReportList.GetAllReports();
userPreferences.ShowPreferences();

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