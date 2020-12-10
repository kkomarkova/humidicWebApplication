import { HumidityReportList } from "./HumidityReportList";
import { Delay } from "./Delay";
import { WeatherReport } from "./WeatherReport";
import { UserPreferences } from "./UserPreferences";

let humidityReportList = new HumidityReportList();
let weatherReport = new WeatherReport();
let userPreferences = new UserPreferences();

//() => syntax because I want "this." inside the method to refer to the class, not the button
let settingsLocationButton:HTMLElement = document.getElementById("settingsLocationButton");
settingsLocationButton.addEventListener('click', () => weatherReport.ChangeLocation());

//Not using the () => syntax here because I do want the "this." inside the method to refer to the button
let settingsSelectPreference0Button:HTMLElement = document.getElementById("0preferenceSelect");
settingsSelectPreference0Button.addEventListener('click', userPreferences.SelectNewPreference);
let settingsSelectPreference1Button:HTMLElement = document.getElementById("1preferenceSelect");
settingsSelectPreference1Button.addEventListener('click', userPreferences.SelectNewPreference);
let settingsSelectPreference2Button:HTMLElement = document.getElementById("2preferenceSelect");
settingsSelectPreference2Button.addEventListener('click', userPreferences.SelectNewPreference);

let settingsConfirmEditButton:HTMLElement = document.getElementById("preferenceEditConfirm");
settingsConfirmEditButton.addEventListener('click', () => userPreferences.EditPreference());
let settingsEdit0Button:HTMLElement = document.getElementById("0edit");
settingsEdit0Button.addEventListener('click', userPreferences.GetEditPreferenceId);
let settingsEdit1Button:HTMLElement = document.getElementById("1edit");
settingsEdit1Button.addEventListener('click', userPreferences.GetEditPreferenceId);
let settingsEdit2Button:HTMLElement = document.getElementById("2edit");
settingsEdit2Button.addEventListener('click', userPreferences.GetEditPreferenceId);

userPreferences.ShowPreferences();
UserPreferences.LoadSelectedPreference();

(async () => {
    await humidityReportList.GetAllReports(); 
    while(true){
        console.log("Activated at " + new Date().getMinutes());
        humidityReportList.UpdateMainPageHumidity();
        weatherReport.GetWeatherData();

        let currentMinute:number = new Date().getMinutes();
        if(currentMinute % UserPreferences.SelectedPreference.updateInterval == 0){
            humidityReportList.GetAllReports();
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