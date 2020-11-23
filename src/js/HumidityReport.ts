export class HumidityReport{
    humidity:number;
    time:Date;

    constructor(humidity:number, time:Date){
        this.humidity = humidity;
        this.time = time;
    }

    DebugReport():string{
        return "The humidity at " + this.time.toLocaleString() + " was " + this.humidity + "%." 
    }
}