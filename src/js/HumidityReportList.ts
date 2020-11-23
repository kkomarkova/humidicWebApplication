import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

import {HumidityReport} from './HumidityReport';

const WebServiceUrl:string = "";

export class HumidityReportList{
    public static HumidityReports:Array<HumidityReport>;

    constructor(){
        //this.GetAllReports();
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
                    new HumidityReport(37, new Date(2020, 11, 23, 10, 0, 0, 0)),
                    new HumidityReport(35, new Date(2020, 11, 23, 10, 15, 0, 0)),
                    new HumidityReport(31, new Date(2020, 11, 23, 10, 30, 0, 0)),
                    new HumidityReport(29, new Date(2020, 11, 23, 10, 45, 0, 0)),
                    new HumidityReport(36, new Date(2020, 11, 23, 11, 0, 0, 0)),
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