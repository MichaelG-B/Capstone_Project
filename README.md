# Capstone_Project
### Project Summary

[Slides](https://docs.google.com/presentation/d/1qWWm32a59_d50zv70wdiNtwFNZ0R9fyxviYYN1JGfe0/edit#slide=id.g17df074bfcd_0_1)

1. **Topic:**
-   An analysis of pilot survivability from U.S. aircraft combat losses during the Vietnam War.
2. **Reason this topic was selected:**
-   As a team we selected this topic because of our shared interest in historical events as well as the nature of the dataset itself. Our data sources provided many features we thought would make for an interesting story once we applied machine learning; notably key characteristics that have potential for influencing pilot survivability. We believe the challenges of analyzing this dataset give us the chance to showcase many of the skills we have learned throughout the course.
3. **Description of our source of data:**
-   Our data sources are two websites dedicated to military aviation research, those being (https://www.aviationarchaeology.com/index.asp) and (https://www.vietnamairlosses.com/index.php). Each provided data on aircraft losses, such as crash date, pilot status, base, aircraft type, etc. However, our initial ML model is working solely off of aviationarchaeology.com since there is a more complete picture of the crash characteristics on this page. All data used was obtained through the use of web scraping techniques. 
4. **Questions we hope to answer with the data:**
-   Can looking at the characteristics of each warplane crash predict whether or not the pilot survived the crash. Our ML model will seek to predict whether a pilot survived or was killed based on particular crash features like aircraft type or what armament hit the plane, for example.
5. **Technologies Used:**
-  **Data Cleaning and Analysis:** All webscraping is being completed using the webscraping library BeautifulSoup. Data cleaning, organizating, and all exploratory analysis is being completed in Pandas.
-  **Database Storage:** Our database has been created in PostgreSQL. The sqlalchemy module was utilized to pull in data from our python ETL file to Postgres and from Postgres to our machine learning python file.
-  **Machine Learning:** SciKitLearn is the ML libary we are using in Python to create our model.
-  **Dashboard:** Using Tableau to create a visual story our findings. An interactive map of crash locations was created in D3 + Leaflet and is embedded into our Tableau story and hosted as a page on our Github repo.


![](Capstone%20Project/Visualizations/Project%20Flowchart.png)

### Data Retrieval
Our raw data was first scraped using the BeautifulSoup library in Pandas. A while loop was used to loop through each individual crash page in Aviation Archaeology and scrape the data found on that page into a single column dataframe.

### Initial Data Cleaning
The initial dataframe of raw scrapped data was first split into multiple columns. Although there are only 1576 crashes listed on the website, the web Id of the last crash was 1606. This is because some of the webpages were completely blank tables devoid of any data. These resulting blank rows in the data frame were removed.

Additional rows were dropped where no Aircraft Serial Number field (Aircraft_SN) was found.
- The data pulled from the web needed a lot of work to become useable:
- Splitting the data into multiple columns
 - Removing rows with missing data
 - Converting certain string fields to integers, datetime
 - Converting location data into decimal degrees format
- Some quick visuals and count checks were created for the characteristics/fields believed to have the most predictive influence on survivability
- A major challenge was the incompleteness of some fields within the dataset.

### Data Exploration
Tableau was utilized to help us visualize our data and better understand what features might contribute towards a machine learning model. Fields pertaining to the mission (ie. base, mission phase, etc.) and the aircraft (ie. aircraft name, ejection seat availability, etc.) were visualized broken down by pilot status.
**Our Tableau Story:**
[Link to Tableau Dashboard](https://public.tableau.com/views/Capstone_Project_Workbook/FinalStory?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link)

### Crash Locations GIF
![](https://github.com/MichaelG-B/Capstone_Project/blob/079f57a4a71d2260850d1bd086ffb723479870e6/Final_crash_locations_gif.gif)

### Interactive Map of Crash Locations:

An interactive map of crash locations was built using D3 + Leaflet and is embedded into our Tableau story. Users can where users can select a crash location and see key crash info and a picture of the plane involved.
![Leaflet_Snapshot](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Visualizations/Screenshots/Final_Leaflet_Snapshot.PNG)

Users can also select by year in order to view crashes that occurred during a particular year. The ability to toggle between light and dark map layers has been added as well. This map is also hosted as a webpage on this Github repository. The link is: https://michaelg-b.github.io/Capstone_Project/

### Description of the analysis phase of the project
- For our analysis, we asked the question can plane attributes, location and  artillery features be predictive of plane crash fatalities.  
Utilizing web scraping, the total population of plane crashes during the Vietnam War was collected.  
	- Our question, lends itself to supervised ML models meant to predict outcomes, such as logistic regression and ensemble models.
	
Description of preliminary data preprocessing

- Prior to running the ML model rows containing nulls and rows containing null values that were strings were removed.
- During our analysis phase all supervised ml models and learned sampling techniques from class were tested. In our initial draft Random Forest models yielded the highest accuracy.  

Description of preliminary feature engineering and preliminary feature selection, including their decision-making process?

- Further refinements included, the addition of new variables from our database, “Ejection Seat (Y/N)”, bucketed aircraft types and defense types, and Latitude and Longitude. These changes reduced the amount of encoded features.  
- This is important as one limiting factor for our analysis, is that it heavily relies on categorical variables which may limit the power of our model.  

- With the addition of Latitude and Longitude other geographic variables such as “Base Name”  and “Mission Phase” were removed due to there duplicative nature. Moreover Lat and Lon were preferred due to their integer data type. 
- With the additional data cleaning and features our ML model improved accuracy from 60% (Draft) to 84%.

- We started off with Seven features which we later encoded to create 45 features

Description of how data was split into training and testing sets
- We utilized from sklearn.model_selection import train_test_split to split and train the testing sets.



### DATABASE

- ERD
![ERD_AllTables](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Database/ERD_AllTables.png)

- The database includes two separate inner joins that create two tables, aircraft_table and usaf_defense that are then joined to create the final table, usaf_defense.

- Postgres connection string
![SQLAlchemy_Conn](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Database/SQLAlchemy_Conn.png)

- Database stores static data in the form of 9 tables in the database. The initial table brought in from the ETL file, usaf_table. These tables store data for the visualizations and machine learning model to connect to.

- Database interfaces with the project through the connection from the ETL file to Postgres. It also connects to the machine learning model, visualizations and will eventually connect to the final accuracy table from the machine learning model.

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


# Updates to ML Sections based on final rubric requirments

**Machine Learning:** SciKitLearn and Imblarn Ensemble are the ML libraries we are using in Python to create our model.

### Description of the analysis phase of the project

**Description of preliminary data preprocessing**

Prior to running the ML model rows containing nulls and rows containing null string values were removed.  Additionally are categorical variables were dummy coded. 

During our analysis phase all supervised ml models and learned sampling techniques from class were tested. In our initial draft our Random Forest model yielded the highest accuracy, thus this model was chosen for further refinment.   

**Description of preliminary feature engineering and preliminary feature selection, including their decision-making process?**

To refine and engineer our features supplemental datasets containing variables such as “normalized” aircraft types, “normalized” defense types, Ejection Seats (Y/N) and Pilot Egress (how they exited the plane) were added. Lastly, our location type variables Base and Mission Phase were dropped in favor of numeric data for longitude and latitude. These changes reduced the amount of encoded features.

Feature selection was a result of multiple accuracy tests.  Dummy coding lead to the use 47 columns in the model versus the initial 7. This limited our ability to use a correlation matrix to identify features.  Lastly, feature selection was limited because of the size of the data set and the amount of null values. 

With the additional data cleaning and features additions, accuracy imporved from **60%** to **84%**.

**Description of how data was split into training and testing sets**

We utilized from sklearn.model_selection import train_test_split to split and train the testing sets.

### Samuel Boester - Triangle 
#### Initial Draft
Utilizing a scrapped database for U.S.A.F. plane crashes during the Vietnam War, multiple supervised ML models were created to see if pilot survival could be predicted by the following **1)** The ammunition or guns used to shoot down the plane "Defense type" **2)** Location data such as “Mission Phase” and home “Base” **3)** The pilot's aircraft "Aircraft Type".  Other variables existed in the database, however many observations had null values.  Therefore, usable features were limited for our model.
Considering our data types (All Categorical) and limited observations (1000-1500) an ensemble model appeared to be the best fit for our analysis.  To prove that multiple sampling techniques and logistic regression analysis were run and compared based upon balanced accuracy scores. 
#### Refinement
To improve our initial draft new features were added from supplemental datasets such “normalized” aircraft types, “normalized” defense types, Ejection Seats (Y/N) and Pilot Egress (how they exited the plane). Lastly, our location type variables Base and Mission Phase were dropped in favor of numeric longitude and latitude data.  Dropping these variables preserved enough data to meet the requirements of our analysis.  With the addition of these variables model accuracy improved from **60%** to **84%**.
#### Visualizations
For final refinement seaborn was used to visualize our confusion matrix in an easy-to-understand format.  Secondly, precision, accuracy and sensitivity scores were cleaned and sent back to our Postgres database for simple KPI visualizations on Tableau Public.
