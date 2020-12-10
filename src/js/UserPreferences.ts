enum UpdateInterval {
    Fifteen = 15,
    Thirty = 30,
    Sixty = 60
}

class UserPreference{
    name:string;
    minHumidity:number;
    maxHumidity:number;
    updateInterval:UpdateInterval;

    constructor(name:string, minHumidity:number, maxHumidity:number, updateInterval:UpdateInterval){
        this.name = name;
        this.minHumidity = minHumidity;
        this.maxHumidity = maxHumidity;
        this.updateInterval = updateInterval;
    }
}

export class UserPreferences{
    static UserPreferences:Array<UserPreference> = new Array<UserPreference>(
        new UserPreference("Profile 1", 25, 40, UpdateInterval.Fifteen),
        new UserPreference("Profile 2", 30, 50, UpdateInterval.Fifteen),
        new UserPreference("Profile 3", 20, 80, UpdateInterval.Fifteen),
    );

    static SelectedPreference:UserPreference;

    public ShowPreferences(){
        for (let index = 0; index < 3; index++) {
            let preferenceName:HTMLElement = document.getElementById(index + "preferenceName");
            let preferenceMin:HTMLElement = document.getElementById(index + "preferenceMin");
            let preferenceMax:HTMLElement = document.getElementById(index + "preferenceMax");
            let preferenceInterval:HTMLElement = document.getElementById(index + "preferenceInterval");
            
            preferenceName.innerText = UserPreferences.UserPreferences[index].name;
            preferenceMin.innerText = UserPreferences.UserPreferences[index].minHumidity + "%";
            preferenceMax.innerText = UserPreferences.UserPreferences[index].maxHumidity + "%";
            preferenceInterval.innerText = "Update interval: " + UserPreferences.UserPreferences[index].updateInterval + " minutes";
        }
    }

    public LoadSelectedPreference(){
        UserPreferences.SelectedPreference = UserPreferences.UserPreferences[0];

        let greeting:HTMLElement = document.getElementById("mainPageGreeting");
        let mainName:HTMLElement = document.getElementById("mainPreferenceName");
        let mainMin:HTMLElement = document.getElementById("mainPreferenceMin");
        let mainMax:HTMLElement = document.getElementById("mainPreferenceMax");
        let mainInterval:HTMLElement = document.getElementById("mainPreferenceInterval");

        mainName.innerText = UserPreferences.SelectedPreference.name;
        mainMin.innerText = UserPreferences.SelectedPreference.minHumidity + "%";
        mainMax.innerText = UserPreferences.SelectedPreference.maxHumidity + "%";
        mainInterval.innerText = "Update interval: " + UserPreferences.SelectedPreference.updateInterval + " minutes";

        greeting.innerText = "Hello " + UserPreferences.SelectedPreference.name + ",\n let's check the humidity!";
    }

    public SelectNewPreference(){
        //This works, don't let visual studio code fool you
        let pressedButton:HTMLElement = this;
        let pressedButtonID:string = pressedButton.getAttribute("id").toString()[0];
        console.log(pressedButtonID);
    }
}