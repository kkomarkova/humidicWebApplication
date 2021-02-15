## About Humidic :droplet:
:droplet:Breathing in humid air activates the nerves in the lungs, that narrow and tighten the
airways. Humidity also makes the air stagnant enough to trap pollutants and allergens like
pollen, dust, mold, dust mites, and smoke. These can set off the asthma symptoms such as
coughing, wheezing and many more.

:droplet:According to the Environmental Protection Agency
(EPA), it is best to keep humidity levels between 30–50%. 
Though you cannot change the weather outside, we want to help the asthma patients keep
the humidity at their home or room set to a comfortable 30 to 50 percent. </br>
To be able to achieve that, we are developing a web application to help the asthma
patients. </br>

:droplet:The idea of the web application is to have a device that is installed in the asthma patient's
room, that checks the humidity level in the room. The patient can set an alert if they want,
so they will be notified when the humidity level is higher or lower that values they have
defined. The webpage will also display the temperature and humidity outside.

## The Humidic design :art:
### The Home page :house:
![Home](https://user-images.githubusercontent.com/58290791/107936886-7b99ad80-6f83-11eb-9f60-a7ada0f7b8f6.png) </br>
### The report page :bar_chart:
![Reports](https://user-images.githubusercontent.com/58290791/107937037-b00d6980-6f83-11eb-81c7-3235b4cbad59.png)
</br>
### The user setting :bust_in_silhouette:
![Settings](https://user-images.githubusercontent.com/58290791/107937177-dd5a1780-6f83-11eb-8893-a72a2a895810.png)
</br>
### The device page :space_invader:
![Device](https://user-images.githubusercontent.com/58290791/107937300-09759880-6f84-11eb-81f8-4cc9f329dc94.png)
</br>

## The Architecture explained
:one:The Sensor is sending constant data to the Console app using the UDP protocol.</br>
:two:The Console App will be sending data to the web services, by using the HTTP post
request. </br>
:three:The Webservices is connected to the database. To add new data to the DB, Webservice use
the Post method, to delete from DB it uses Delete method, to get data from DB it will use
Get method. So, data is going back and forth between DB and the Webservices. </br>
:four:The database is saved in the cloud using Azure. </br>
:five:The web application is designed and coded using HTML, CSS and Typescript. It gets the
data from the Webservices. When the user uses the Web application, he
is sending requests and receive responses using Axios methods that are in the
Typescript code behind. </br>
:six:The web application receives data from the 3rd party and from the Web service.
