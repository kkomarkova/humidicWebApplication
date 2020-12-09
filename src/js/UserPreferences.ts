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
        //For now
        this.updateInterval = updateInterval;
    }
}

export class UserPreferences{
    static UserPreferences:Array<UserPreference> = new Array<UserPreference>(
        new UserPreference("Default", 25, 40, UpdateInterval.Fifteen),
        new UserPreference("Test1", 30, 50, UpdateInterval.Fifteen),
        new UserPreference("Test2", 20, 80, UpdateInterval.Fifteen),
        new UserPreference("Test3", 4, 8, UpdateInterval.Fifteen)
    );

    static SelectedPreference:UserPreference;

    //Not done
    public CreateNewPreference(){
        let preferenceName:string = document.getElementById("newPreferenceName").innerText;
        let minValue:number = +document.getElementById("newPreferenceMin").innerText;
        let maxValue:number = +document.getElementById("newPreferenceMax").innerText;
        //Switch statement based on what's selected?
        let updateInterval:UpdateInterval;

        //UserPreferences.UserPreferences.push(new UserPreference(preferenceName, minValue, maxValue, updateInterval));
        UserPreferences.UserPreferences.push(new UserPreference("Test", 30, 50, UpdateInterval.Fifteen));
    }

    public ShowPreferences(){
        let preferenceContainer = <HTMLDivElement>document.getElementById("settingsPreferenceContainer");
        
        while (preferenceContainer.firstChild) {
            preferenceContainer.removeChild(preferenceContainer.lastChild);
        }

        UserPreferences.UserPreferences.forEach((preference:UserPreference) => {
            preferenceContainer.innerHTML += '<div class="col-6"><div id="settingsPreferenceCard" class="card stats"><div class="card-body"><div class="row"><div class="col-3"><i class="uil uil-user icon-40"></i></div><div class="col-6"><p>'+ preference.name +'</p></div><div class="col-3"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button"id="dropdownMenuButton" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false"><i class="uil uil-setting"></i></button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><button class="dropdown-item" href="#" data-toggle="modal"data-target="#editModal">Edit</button><button class="dropdown-item" href="#" data-toggle="collapse"data-target="#collapseDelete" aria-expanded="false"aria-controls="collapseDelete">Delete</button></div></div><div class="collapse" id="collapseDelete"><div class="card card-body">You are going to delete your preference. This change will be permanent<button type="button" class="btn btn-danger">Delete</button></div><div class="modal fade" id="editModal" tabindex="-1" role="dialog"aria-labelledby="editModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="editModalLabel">Edit my preference</h5><button type="button" class="close"data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><form><div class="form-group"><label for="preference-name"class="col-form-label">Preferencename:</label><input type="text" class="form-control"id="preference-name"></div><div class="form-group"><label for="minhumidity"class="col-form-label">Minimumhumidity level:</label><textarea class="form-control"id="minhumidity"></textarea></div><div class="form-group"><label for="maxhumidity"class="col-form-label">Maximumhumidity level:</label><input type="text" class="form-control"id="maxhumidity"></div><div class="form-group"><label for="updateinterval"class="col-form-label">Theupdate interval:</label><input type="text" class="form-control"id="updateinterval"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary"data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Updatepreference</button></div></div></div></div></div></div><div class="pl-4"><ul class="list-inline"><li class="bold pr-3">Min.</li><li>'+ preference.minHumidity +'%</li><li class="bold pr-3">Max.</li><li>'+ preference.maxHumidity +'%</li></ul><p class="date">Update interval: '+ preference.updateInterval +' minutes</p></div></div></div></div></div>';
        });
    }
}