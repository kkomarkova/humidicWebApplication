import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { relativeTimeThreshold } from "../../node_modules/moment/ts3.1-typings/moment";

import {HumidityReport} from './HumidityReport';

const WebServiceUrl:string = "https://humidityweb.azurewebsites.net/api/humidity";

export class HumidityReportList{
    public static HumidityReports:Array<HumidityReport> = new Array<HumidityReport>(
        new HumidityReport(0, new Date())
    );
    public static CurrentHumidity:HumidityReport;

    constructor(){
        //this.GetAllReports();
        //this.FindLatestReport();
        //this.UpdateMainPageHumidity();
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
        latestHumidity = HumidityReportList.HumidityReports.reduce((a, b) => (a.date > b.date ? a : b));
        return latestHumidity;
        //console.log("The latest humidity is: " + latestHumidity.DebugReport());
    }

    public async GetAllReports():Promise<void>{
        await axios.get(WebServiceUrl)
        .then(function(response: AxiosResponse<HumidityReport[]>):void{
            console.log(response);
            console.log("Statuscode is :" + response.status);
            //Empties the current array
            HumidityReportList.HumidityReports = new Array<HumidityReport>();

            response.data.forEach((humidity: HumidityReport) => {
                console.log(humidity);

                let convertedDate:Date = HumidityReportList.ConvertDateFormat(humidity.date.toString());                
                HumidityReportList.HumidityReports.push(new HumidityReport(humidity.level, convertedDate));

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

    //This just didn't work for some reason unless I made it static
    public static ConvertDateFormat(date:string):Date{
        //console.log(date); //2020-11-20T11:00:00
        let splitDate:string[] = date.split("T", 2);
        //console.log(splitDate);
        let splitDay:string[] = splitDate[0].split("-", 3);
        //console.log(splitDay);
        let splitHour:string[] = splitDate[1].split(":", 3);
        
        let day:number = +splitDay[2];
        let month:number = +splitDay[1];
        let year:number = +splitDay[0];
        let hour:number = +splitHour[0];
        let minute:number = +splitHour[1];
        let second:number;

        //Removes miliseconds if necessary
        if (splitHour[2].includes(".")){
            let splitSecond:string[] = splitHour[2].split(".", 2);
            second = +splitSecond[0];
        }
        else{
            second = +splitHour[2];
        }

        return new Date(year, month, day, hour, minute, second);
    }
}
