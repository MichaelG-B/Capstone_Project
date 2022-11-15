# Vietnam War Plane Crash Survivability
### Project Summary

[Slides](https://docs.google.com/presentation/d/1qWWm32a59_d50zv70wdiNtwFNZ0R9fyxviYYN1JGfe0/edit#slide=id.g17df074bfcd_0_1)

### **Topic**
An analysis of pilot survivability from U.S. aircraft combat losses during the Vietnam War.
### **Reason this topic was selected**
As a team we selected this topic because of our shared interest in historical events as well as the nature of the dataset itself. Our data sources provided many features we thought would make for an interesting story once we applied machine learning; notably key characteristics that have potential for influencing pilot survivability. We believe the challenges of analyzing this dataset give us the chance to showcase many of the skills we have learned throughout the course.
### **Description of our source of data**
Our data sources are two websites dedicated to military aviation research, those being (https://www.aviationarchaeology.com/index.asp) and (https://www.vietnamairlosses.com/index.php). Each provided data on aircraft losses, such as crash date, pilot status, base, aircraft type, etc. However, our initial ML model is working solely off of aviationarchaeology.com since there is a more complete picture of the crash characteristics on this page. All data used was obtained through the use of web scraping techniques. 
### **Questions we hope to answer with the data**
Can looking at the characteristics of each warplane crash predict whether or not the pilot survived the crash. Our ML model will seek to predict whether a pilot survived or was killed based on particular crash features like aircraft type or what armament hit the plane, for example.
### **Technologies Used**
- Python
- Tableau
- Postgres
- D3 & Leaflet
### **Data Cleaning and Analysis** 
All webscraping is being completed using the webscraping library BeautifulSoup. Data cleaning, organizating, and all exploratory analysis is being completed in Pandas.
### **Database Storage** 
Our database has been created in PostgreSQL. The sqlalchemy module was utilized to pull in data from our python ETL file to Postgres and from Postgres to our machine learning python file.
### **Machine Learning** 
SciKitLearn is the ML libary we are using in Python to create our model.
### **Dashboard** 
Using Tableau to create a visual story our findings. An interactive map of crash locations was created in D3 + Leaflet and is embedded into our Tableau story and hosted as a page on our Github repo.


![](Capstone%20Project/Visualizations/Project%20Flowchart.png)

### Data Retrieval
Our raw data was first scraped using the BeautifulSoup library in Pandas. A while loop was used to loop through each individual crash page in Aviation Archaeology and scrape the data found on that page into a single column dataframe.

### Initial Data Cleaning
The initial dataframe of raw scrapped data was first split into multiple columns. Although there are only 1576 crashes listed on the website, the web Id of the last crash was 1606. This is because some of the webpages were completely blank tables devoid of any data. These resulting blank rows in the data frame were removed.

Rows with no Aircraft Serial Number (Aircraft_SN) were also dropped. Many of these rows with no unique crash identifier also had a lot of other missing data. This brought the dataframe down from 1576 crashes to 1540. 

Data type conversion was needed for some of the fields. A few like Altitude and Airspeed were converted to integer format. Crash Date was changed to datateime. Coordinates of crash locations needed to be converted from decimal, minutes, and seconds format to decimal degrees (DD) format. This was done by breaking the original lat/long strings into their respective degrees and minutes, converting to numeric, and then using the following formula: DD = Degrees + (Minutes/60) + (Seconds/3600).

### DATABASE

- ERD
![ERD_AllTables](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Database/ERD_AllTables.png)

- The database includes two separate inner joins that create two tables, aircraft_table and usaf_defense that are then joined to create the final table, usaf_defense.

- Postgres connection string
![SQLAlchemy_Conn](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Database/SQLAlchemy_Conn.png)

- Database stores static data in the form of 9 tables in the database. The initial table brought in from the ETL file, usaf_table. These tables store data for the visualizations and machine learning model to connect to.

- Database interfaces with the project through the connection from the ETL file to Postgres. It also connects to the machine learning model, visualizations and will eventually connect to the final accuracy table from the machine learning model.

### Data Exploration
Tableau was utilized to help us visualize our data and better understand what features might contribute towards a machine learning model. It can be found here: [Link to Dashboard](https://public.tableau.com/views/Capstone_Project_Workbook/FinalStory?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link). 
Fields pertaining to the mission (ie. base, mission phase, etc.) and the aircraft (ie. aircraft name, ejection seat availability, etc.) were visualized. Pilot status was used as a color marker to reveal the breakdown between KIA and survived for each of these fields. Some of the terms found in this dashboard may not be familiar to many readers. A list of these key terms: **KIA - Killed in Action**, **MIA - Missing in Action**, **POW - Prisoner of War**, **SAM - Surface-to-Air Missile**, **AAA - Anti-Aircraft Artillery**, **MIG - Soviet-built fighter aircraft**

![](https://github.com/MichaelG-B/Capstone_Project/blob/079f57a4a71d2260850d1bd086ffb723479870e6/Final_crash_locations_gif.gif)

#### Interactive Map of Crash Locations:
A simple map of KIA crashes in red and survived in blue was created in Tableau and shown in the gif above. The ability to map crash locations presented an interesting opportunity to build a map with user interactivity. As such, an interactive map was built using D3.js + Leaflet and is embedded into our Tableau story. Users can where users can select a crash location and see key crash info and a picture of the plane involved. Users can also select by year in order to view crashes that occurred during a particular year. The ability to toggle between light and dark map layers has been added as well. This map is also hosted as a webpage on this Github repository. The link is: https://michaelg-b.github.io/Capstone_Project/

#### Map Snapshot:
![Leaflet_Snapshot](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Visualizations/Screenshots/Final_Leaflet_Snapshot.PNG)


### Description of the ML analysis phase of the project

**Machine Learning:** SciKitLearn and Imblarn Ensemble are the ML libraries we are using in Python to create our model.

**Description of preliminary data preprocessing**

Prior to running the ML model rows containing nulls and rows containing null string values were removed.  Additionally are categorical variables were dummy coded. 

During our analysis phase all supervised ml models and learned sampling techniques from class were tested. In our initial draft our Random Forest model yielded the highest accuracy, thus this model was chosen for further refinment.   

**Description of preliminary feature engineering and preliminary feature selection, including their decision-making process?**

To refine and engineer our features supplemental datasets containing variables such as “normalized” aircraft types, “normalized” defense types, Ejection Seats (Y/N) and Pilot Egress (how they exited the plane) were added. Lastly, our location type variables Base and Mission Phase were dropped in favor of numeric data for longitude and latitude. These changes reduced the amount of encoded features.

Feature selection was a result of multiple accuracy tests.  Dummy coding lead to the use 47 columns in the model versus the initial 7. This limited our ability to use a correlation matrix to identify features.  Lastly, feature selection was limited because of the size of the data set and the amount of null values. 

With the additional data cleaning and features additions, accuracy imporved from **60%** to **84%**.

**Description of how data was split into training and testing sets**

We utilized from sklearn.model_selection import train_test_split to split and train the testing sets.

**Neural Network Test Practice - Clara to add**

### Contributors

Thanks to the following people who have contributed to this project:

* [@bfox87](https://github.com/bfox87) 
* [@CPotts82](https://github.com/CPotts82) 
* [@samboest](https://github.com/samboest) 
* [@MichaelG-B](https://github.com/MichaelG-B) 


## Segment 3
Accomplishments and goals moving forward-

### Clara Potts – Circle Role

- Worked with Ben and Michael on the Interactive Map:
	- Created table in Postgres to export and merge with supplementary data to create the geoJSON file used in the interactive map
	- Worked on multiple formatting issues within the map

- Finished the Neural Net test Model
	- Preprocessed data to reflect same features as main ML model
	- Cleaned data - removing nulls
	- Binned and transformed data to condense number of unique values per features and target variable
	- Built neural net and optimized

- Updated and maintained Schema.sql file with the SQL code for the new table created for geoJSON file. 

### Michael Beyer - Square Role

- Worked on creating a GIF for our Crash Locations map that would skim through markers on the map by year (1962-1973)

- Worked with Ben and Clara to edit our Leaflet/D3 map we created; specifically testing out additional layers that could potentially be used.

- Worked on editing our mock slides to prepare for the final presentation.

- Updated and managed our projects github repository in order to keep a clean working repository

- Helped team members with issues/problems that arose with Github


### Ben Fox - X Role

- Redesigned initial Tableau dashboard to be a more complete and improved visual story
- Worked with Clara and Michael to build our interactive map with D3 + Leaflet
- Collaborated with Samuel to determine best way to visualize the ML results in Tableau

### Samuel Boester - Triangle 
#### Initial Draft
Utilizing a scrapped database for U.S.A.F. plane crashes during the Vietnam War, multiple supervised ML models were created to see if pilot survival could be predicted by the following **1)** The ammunition or guns used to shoot down the plane "Defense type" **2)** Location data such as “Mission Phase” and home “Base” **3)** The pilot's aircraft "Aircraft Type".  Other variables existed in the database, however many observations had null values.  Therefore, usable features were limited for our model.
Considering our data types (All Categorical) and limited observations (1000-1500) an ensemble model appeared to be the best fit for our analysis.  To prove that multiple sampling techniques and logistic regression analysis were run and compared based upon balanced accuracy scores. 
#### Refinement
To improve our initial draft new features were added from supplemental datasets such “normalized” aircraft types, “normalized” defense types, Ejection Seats (Y/N) and Pilot Egress (how they exited the plane). Lastly, our location type variables Base and Mission Phase were dropped in favor of numeric longitude and latitude data.  Dropping these variables preserved enough data to meet the requirements of our analysis.  With the addition of these variables model accuracy improved from **60%** to **84%**.
#### Visualizations
For final refinement seaborn was used to visualize our confusion matrix in an easy-to-understand format.  Secondly, precision, accuracy and sensitivity scores were cleaned and sent back to our Postgres database for simple KPI visualizations on Tableau Public.
