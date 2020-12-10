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
        new UserPreference("Profile 1", 25, 50, UpdateInterval.Fifteen),
        new UserPreference("Profile 2", 25, 50, UpdateInterval.Thirty),
        new UserPreference("Profile 3", 25, 50, UpdateInterval.Sixty),
    );

    static SelectedPreference:UserPreference;
    static PressedEditButton:number;

    constructor(){
        UserPreferences.LoadFromLocal();
    }

    public ShowPreferences(){
        UserPreferences.LoadFromLocal();
        for (let index = 0; index < UserPreferences.UserPreferences.length; index++) {
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

    public static LoadSelectedPreference(){
        UserPreferences.LoadFromLocal();
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
        //This works, don't let visual studio code fool you. It thinks "this" refers to the class
        //but when you run it in the browser, this actually refers to the button
        let pressedButton:HTMLElement = this;
        let pressedButtonID:string = pressedButton.getAttribute("id").toString()[0];
        UserPreferences.SelectedPreference = UserPreferences.UserPreferences[parseInt(pressedButtonID)];

        UserPreferences.SaveToLocal();
        UserPreferences.LoadSelectedPreference();
    }

    public EditPreference(){
        //This also works
        let newName:string = <HTMLInputElement>document.getElementById("preferenceEditName").value;
        let newMin:number = <HTMLInputElement>document.getElementById("preferenceEditMin").value;
        let newMax:number = <HTMLInputElement>document.getElementById("preferenceEditMax").value;
        let newInterval:UpdateInterval;
        let selectedInterval:HTMLSelectElement = <HTMLSelectElement>document.getElementById("preferenceEditInterval");

        switch (selectedInterval.value){
            case("15"):
                newInterval = UpdateInterval.Fifteen;
                break;
            case("30"):
                newInterval = UpdateInterval.Thirty;
                break;
            case("60"):
                newInterval = UpdateInterval.Sixty;
                break;
        }
        
        UserPreferences.UserPreferences[UserPreferences.PressedEditButton] = new UserPreference(newName, newMin, newMax, newInterval);
        UserPreferences.SelectedPreference = UserPreferences.UserPreferences[UserPreferences.PressedEditButton];
        UserPreferences.SaveToLocal();
        this.ShowPreferences();        
        UserPreferences.LoadSelectedPreference();
    }

    public GetEditPreferenceId(){
        let pressedButton:HTMLElement = this;
        let pressedButtonID:string = pressedButton.getAttribute("id").toString()[0];
        UserPreferences.PressedEditButton = parseInt(pressedButtonID);
        console.log(UserPreferences.PressedEditButton);
    }

    public static LoadFromLocal(){
        for (let index = 0; index < UserPreferences.UserPreferences.length; index++) {
            if(window.localStorage.getItem("preference" + index) != null){
                UserPreferences.UserPreferences[index] = JSON.parse(window.localStorage.getItem("preference" + index));
            }
        }

        UserPreferences.SelectedPreference = JSON.parse(window.localStorage.getItem("selectedPreference"));
        if(UserPreferences.SelectedPreference == null){
            UserPreferences.SelectedPreference = UserPreferences.UserPreferences[0];
        }
    }

    public static SaveToLocal(){
        for (let index = 0; index < UserPreferences.UserPreferences.length; index++) {
            window.localStorage.setItem("preference" + index, JSON.stringify(UserPreferences.UserPreferences[index]));
        }
        window.localStorage.setItem("selectedPreference", JSON.stringify(UserPreferences.SelectedPreference));
    }
}