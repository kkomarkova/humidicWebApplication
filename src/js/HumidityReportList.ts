import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

import {HumidityReport} from './HumidityReport';

const WebServiceUrl:string = "https://humidityweb.azurewebsites.net/api/humidity";

export class HumidityReportList{
    public static HumidityReports:Array<HumidityReport> = new Array<HumidityReport>(
        new HumidityReport(0, new Date())
    );
    public static CurrentHumidity:HumidityReport;

    constructor(){
        this.GetAllReports();
        //this.FindLatestReport();
        this.UpdateMainPageHumidity();
    }

    public UpdateMainPageHumidity():void{
        let mainPageHumidityValue:HTMLElement = document.getElementById("roomHumidityValue");
        let mainPageHumidityLastUpdated:HTMLSpanElement = document.getElementById("roomHumidityLastUpdated");

        let latestHumidity:HumidityReport = this.FindLatestReport();
        
        let timeDifference:number = new Date().getMinutes() - latestHumidity.date.getMinutes();
        if(timeDifference < 0){
            timeDifference += 60;
        }

        mainPageHumidityValue.innerHTML = latestHumidity.level.toString() + "%";
        mainPageHumidityLastUpdated.innerHTML = "Last Updated: " + timeDifference + " minutes ago.";
    }

    public FindLatestReport():HumidityReport{
        let latestHumidity:HumidityReport;
        if(HumidityReportList.HumidityReports.length != 0){
            latestHumidity = HumidityReportList.HumidityReports.reduce((a, b) => (a.date > b.date ? a : b));
        }
        return latestHumidity;
        //console.log("The latest humidity is: " + latestHumidity.DebugReport());
    }

    public GetAllReports():void{
        axios.get(WebServiceUrl)
        .then(function(response: AxiosResponse<HumidityReport[]>):void{
            console.log(response);
            console.log("Statuscode is :" + response.status);
            
            //Empties the current array
            HumidityReportList.HumidityReports = new Array<HumidityReport>();

            response.data.forEach((humidity: HumidityReport) => {
                console.log(humidity);
                
                HumidityReportList.HumidityReports.push(new HumidityReport(humidity.level, humidity.date));

                //Fake data
                //HumidityReportList.HumidityReports.push(
                //    new HumidityReport(37, new Date(2020, 10, 23, 10, 0, 0, 0)),
                //    new HumidityReport(35, new Date(2020, 10, 23, 10, 15, 0, 0)),
                //    new HumidityReport(31, new Date(2020, 10, 23, 10, 30, 0, 0)),
                //    new HumidityReport(29, new Date(2020, 10, 23, 10, 45, 0, 0)),
                //    new HumidityReport(36, new Date(2020, 10, 23, 11, 0, 0, 0)),

                //    new HumidityReport(100, new Date()),
                //)
            });

            //Test
            HumidityReportList.HumidityReports.forEach((humidity: HumidityReport) => {
                console.log(humidity.DebugReport());
            });
        })

        .catch(function(error:AxiosError):void{
            console.log(error);
        })
    }
}
