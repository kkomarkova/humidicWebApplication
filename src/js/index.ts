import { HumidityReportList } from "./HumidityReportList";
import { Delay } from "./Delay";

let humidityReportList = new HumidityReportList();

//humidityReportList.GetAllReports();

(async () => { 
    while(true){
        console.log("Activated at " + new Date().getMinutes());
        humidityReportList.UpdateMainPageHumidity();

        let currentMinute:number = new Date().getMinutes();
        if(currentMinute % 15 == 0){
            humidityReportList.GetAllReports();
            //humidityReportList.FindLatestReport();
            humidityReportList.UpdateMainPageHumidity();
        }

        //One minute
        await Delay(60000);
    }
})();