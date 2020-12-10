import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { relativeTimeThreshold } from "../../node_modules/moment/ts3.1-typings/moment";

import {HumidityReport} from './HumidityReport';
import { UserPreferences } from "./UserPreferences";

const WebServiceUrl:string = "https://humidityweb.azurewebsites.net/humidity";

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
        let hourDifference:number = new Date().getHours() - latestHumidity.date.getHours();
        if(hourDifference < 0){
            hourDifference += 60;
        }
        let dayDifference:number = new Date().getDate() - latestHumidity.date.getDate();
        if(dayDifference < 0){
            dayDifference *-1;
        }

        mainPageHumidityValue.innerHTML = latestHumidity.level.toString() + "%";
        mainPageHumidityLastUpdated.innerHTML = "Last Updated: " + timeDifference + " minutes ago.";
        if(hourDifference != 0){
            mainPageHumidityLastUpdated.innerHTML = "Last Updated: " + timeDifference + " minutes, " + hourDifference + " hours ago.";
        }
        if(dayDifference != 0){
            mainPageHumidityLastUpdated.innerHTML = "Last Updated: " + timeDifference + " minutes, " + hourDifference + " hours, " + dayDifference + " days ago.";
        }

        if(latestHumidity.level < UserPreferences.SelectedPreference.minHumidity || latestHumidity.level > UserPreferences.SelectedPreference.maxHumidity){
            console.log("ALEERT!!!!!!!!!!!!!!!!!!!!!!!!!");
            let humidityCard:HTMLElement = document.getElementById("humidityCard");
            humidityCard.setAttribute("class", "alertcard mb-5 stats w-100");
        }
        else{
            let humidityCard:HTMLElement = document.getElementById("humidityCard");
            humidityCard.setAttribute("class", "card mb-5 stats w-100");
        }
    }

    public FindLatestReport():HumidityReport{
        let latestHumidity:HumidityReport;
        latestHumidity = HumidityReportList.HumidityReports.reduce((a, b) => (a.date > b.date ? a : b));
        return latestHumidity;
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

    public static async HumidityReportFor3Ddays():Promise<void>{
        let list:HTMLOListElement=<HTMLOListElement> document.getElementById("list");
        await axios.get("https://humidityweb.azurewebsites.net/Humidity/3days")
        .then(function(response: AxiosResponse<HumidityReport[]>):void{
          console.log(response);
          console.log("Statuscode for 1 days is :" + response.status)
        
       
                     
          while(list.firstChild){
            list.removeChild(list.lastChild);
        }

        HumidityReportList.HumidityReports = new Array<HumidityReport>();

        response.data.forEach((humidity: HumidityReport) => {
                         
         let datetime = new Date(humidity.date);
         let day = datetime.getDate().toString().padStart(2, "0");
         let month = datetime.getMonth() +1 ; //month: 0-11
         let year = datetime.getFullYear();
         let date = day + "-" + month + "-" + year + "   ";

         let hours = datetime.getHours().toString().padStart(2, "0");
         let minutes = datetime.getMinutes().toString().padStart(2, "0");
         let time = hours + ":" + minutes ;      
         
           let newRow: HTMLLIElement = HumidityReportList.addList( humidity.level + "%" +" \xa0\xa0\xa0\xa0\xa0\xa0\xa0  " +  date+" \xa0\xa0\xa0\xa0\xa0\xa0\xa0 "   + time);
            list.appendChild(newRow);

         console.log(humidity);                 
    })
    
  })
  .catch( function (error: AxiosError ):  void {
    console.log(error)
  })

}

    
                public static async HumidityReportFor7Ddays():Promise<void>{

                 let list:HTMLOListElement=<HTMLOListElement> document.getElementById("list");
        
                 await axios.get("https://humidityweb.azurewebsites.net/Humidity/7days")
                 .then(function(response: AxiosResponse<HumidityReport[]>):void{
                   console.log(response);
                   console.log("Statuscode for 1 days is :" + response.status)
                    
                   while(list.firstChild){
                       list.removeChild(list.lastChild);
                   }

                   HumidityReportList.HumidityReports = new Array<HumidityReport>();

                   response.data.forEach((humidity: HumidityReport) => {
                    
                    
                    let datetime = new Date(humidity.date);
                    let day = datetime.getDate().toString().padStart(2, "0");
                    let month = datetime.getMonth() +1; //month: 0-11
                    let year = datetime.getFullYear();
                    let date = day + "-" + month + "-" + year + "   ";

                    let hours = datetime.getHours().toString().padStart(2, "0");
                    let minutes = datetime.getMinutes().toString().padStart(2, "0");;
                    let time = hours + ":" + minutes ;      
                    
                      let newRow: HTMLLIElement = HumidityReportList.addList(humidity.level + "%" +" \xa0\xa0\xa0\xa0\xa0\xa0\xa0  " +  date+" \xa0\xa0\xa0\xa0\xa0\xa0\xa0 "   + time);
                       list.appendChild(newRow);
       
                    console.log(humidity);                 
               })
               
             })
             .catch( function (error: AxiosError ):  void {
               console.log(error)
             })
   
         }

         public static async HumidityReportFor1Dday():Promise<void>{
           
            let list:HTMLOListElement=<HTMLOListElement> document.getElementById("list");
                 await axios.get("https://humidityweb.azurewebsites.net/Humidity/1day")
                 .then(function(response: AxiosResponse<HumidityReport[]>):void{
                   console.log(response);
                   console.log("Statuscode for 1 days is :" + response.status)
                 
                     
                   while(list.firstChild){
                    list.removeChild(list.lastChild);
                }

                HumidityReportList.HumidityReports = new Array<HumidityReport>();

                response.data.forEach((humidity: HumidityReport) => {

                 
                    
                 let datetime = new Date(humidity.date);
                 let day = datetime.getDate().toString().padStart(2, "0");
                 let month = datetime.getMonth() +1 ; //month: 0-11
                 let year = datetime.getFullYear();
                 let date = day + "-" + month + "-" + year + "   ";

                 let hours = datetime.getHours().toString().padStart(2, "0");
                 let minutes = datetime.getMinutes().toString().padStart(2, "0");;
                 let time = hours + ":" + minutes ;      
                 
                   let newRow: HTMLLIElement = HumidityReportList.addList(humidity.level + "%" +" \xa0\xa0\xa0\xa0\xa0\xa0\xa0  " +  date+" \xa0\xa0\xa0\xa0\xa0\xa0\xa0 "   + time);
                    list.appendChild(newRow);
    
                 console.log(humidity);                 
            })
            
          })
          .catch( function (error: AxiosError ):  void {
            console.log(error)
          })

      }

      public static addList(text:string):HTMLLIElement{

        let newLi :HTMLLIElement = document.createElement('li');
        let newTextNode : Text = document.createTextNode(text);
        newLi.appendChild(newTextNode);
        return newLi;
    }

    public static DeleteOldData(): void{

        axios.delete("https://humidityweb.azurewebsites.net/Humidity")
        .then(function(response : AxiosResponse){

            console.log( "the delete status is" +response.status)
             
        } )
        .catch( function( error: AxiosError){
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
