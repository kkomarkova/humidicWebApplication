export class HumidityReport{
    level:number;
    date:Date;

    constructor(humidity:number, time:Date){
        this.level = humidity;
        this.date = time;
    }

    public DebugReport():string{
        return "The humidity at " + this.date.toLocaleString() + " was " + this.level + "%." 
    }
}