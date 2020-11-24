import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

import {HumidityReport} from './HumidityReport';

const WebServiceUrl:string = "";

export class HumidityReportList{
    public static HumidityReports:Array<HumidityReport>;
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
        
        let timeDifference:number = new Date().getMinutes() - latestHumidity.time.getMinutes();
        if(timeDifference < 0){
            timeDifference += 60;
        }

        mainPageHumidityValue.innerHTML = latestHumidity.humidity.toString() + "%";
        mainPageHumidityLastUpdated.innerHTML = "Last Updated: " + timeDifference + " minutes ago.";
    }

    public FindLatestReport():HumidityReport{
        let latestHumidity:HumidityReport;
        latestHumidity = HumidityReportList.HumidityReports.reduce((a, b) => (a.time > b.time ? a : b));
        return latestHumidity;
        //console.log("The latest humidity is: " + latestHumidity.DebugReport());
    }

    public GetAllReports():void{
        //axios.get(WebServiceUrl)
        //.then(function(response: AxiosResponse<HumidityReport[]>):void{
        //    console.log(response);
        //    console.log("Statuscode is :" + response.status);
            
            //Empties the current array
            HumidityReportList.HumidityReports = new Array<HumidityReport>();

        //    response.data.forEach((humidity: HumidityReport) => {
        //        console.log(humidity);
                
        //        HumidityReportList.HumidityReports.push(humidity);

                //Fake data
                HumidityReportList.HumidityReports.push(
                    new HumidityReport(37, new Date(2020, 10, 23, 10, 0, 0, 0)),
                    new HumidityReport(35, new Date(2020, 10, 23, 10, 15, 0, 0)),
                    new HumidityReport(31, new Date(2020, 10, 23, 10, 30, 0, 0)),
                    new HumidityReport(29, new Date(2020, 10, 23, 10, 45, 0, 0)),
                    new HumidityReport(36, new Date(2020, 10, 23, 11, 0, 0, 0)),

                    new HumidityReport(100, new Date()),
                )
        //    });

            //Test
            HumidityReportList.HumidityReports.forEach((humidity: HumidityReport) => {
                console.log(humidity.DebugReport());
            });
        }//)

        //.catch(function(error:AxiosError):void{
        //    console.log(error);
        //})
    }
//}
