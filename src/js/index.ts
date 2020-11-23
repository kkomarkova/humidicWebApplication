import { HumidityReportList } from "./HumidityReportList";
import { Delay } from "./Delay";

let humidityReportList = new HumidityReportList();

humidityReportList.GetAllReports();

(async () => { 
    while(true){
        let currentMinute:number = new Date().getMinutes();
        if(currentMinute % 5 == 0){
            humidityReportList.GetAllReports();
        }

        //One minute
        await Delay(60000);
    }
})();