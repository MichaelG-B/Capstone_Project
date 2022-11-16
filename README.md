# Vietnam War Plane Crash Survivability
### Project Summary

[Slides](https://docs.google.com/presentation/d/1qWWm32a59_d50zv70wdiNtwFNZ0R9fyxviYYN1JGfe0/edit#slide=id.g17df074bfcd_0_1)

### **Topic**
An analysis of pilot survivability from U.S. aircraft combat losses during the Vietnam War.
### **Reason this topic was selected**
As a team we selected this topic because of our shared interest in historical events as well as the nature of the dataset itself. Our data sources provided many features we thought would make for an interesting story once we applied machine learning; notably key characteristics that have potential for influencing pilot survivability. We believe the challenges of analyzing this dataset give us the chance to showcase many of the skills we have learned throughout the course.
### **Data Source Description**
A website dedicated to aviation research, (https://www.aviationarchaeology.com/index.asp), which contains a searchable database of 1,576 U.S. Air Force combat-related losses during the Vietnam War. This website is the creation of Craig Fuller of the Aviation Archaeological Investigation & Research (AAIR) organization. Some additional research was also conducted on (https://www.vietnamairlosses.com/index.php) to add some context to the data scraped from Aviation Archaeology. All data pulled from these websites was obtained through the use of web scraping techniques. 
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

Data type conversion was needed for some of the fields. A few like Altitude and Airspeed were converted to integer format. Crash Date was changed to datetime. Coordinates of crash locations needed to be converted from decimal, minutes, and seconds format to decimal degrees (DD) format. This was done by breaking the original lat/long strings into their respective degrees and minutes, converting to numeric, and then using the following formula: DD = Degrees + (Minutes/60) + (Seconds/3600).
The converted coordinate data was also added to a separate dataframe along with a few other crash characteristic fields for use in our interactive map. This geo map dataframe was exported into a csv file that was then converted to geoJSON format using an open source tool found at (https://open-innovations.github.io/CSV2GeoJSON/).

### DATABASE

PostgreSQL was used to store and further transform data for ease of use in creating visualizations and the machine learning model. The original table, usaf_table, was brought into Postgres using SQLAlchemy from the Vietnam_Losses_ETL file. This initial table was used as the basis for the supplementary tables and to create our final table. 

The database stores static data in the form of 11 tables. These tables include the original usaf_table brought in from the python ETL file, five supplementary data tables, three tables that were created through joins, and one table that was generated solely to build the geojson file for the interactive map. The final table holds the results of the machine learning model.

- ERD
![ERD_AllTables](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Database/ERD_AllTables.png)

Supplementary tables were created to expand on or clean the data from the original usaf_table. Through additional research from www.vietnamairlosses.com, wikipedia, and various other sources, the team created and imported csv files into the following postgres tables: aircraft_information, base_table, loss_locations_table, country_table, and defense_type tables. The aircraft_information table expanded the abbreviated 'Aircraft Type' feature to include full aircraft name and summarized name as well as added an ejection seat feature. Base_table and country_table both expanded on abbreviated data by including full country names and complete base names along with the latitude and longitude of each base. The defense_type table was created to clean and categorize the multitude of values in the original 'Defense Type' feature. Finally, the loss_locations_table was produced with cleaned and converted (to decimal degrees) latitude and longitude data.

The database includes three separate joins that were steps in the process to generate our final table, usaf_coomplete. The first join created the aircraft_table and connected the original usaf_table with the supplementary aircraft_information table in order to update the unique aircraft serial number to include 'full_name' and 'summarized_name' of each aircraft type as well as ejection seat status. The second join generated the usaf_defense table by uniting our original table with the supplementary defense_type table so that each aircraft serial number would contain the new categorized defense type. The final join produced the ultimate usaf_complete table by connecting the newly made aircraft_table with the newly made usaf_defense table. The final usaf_complete table encompassed expanded and supplemental data into a clean and straightforward table to be used by the machine learning model and visualizations. 

The database interfaces with the project through the SQLAlchemy connection from the ETL file to Postgres. The Postgres database is also interfaced with the machine learning file by bringing data to the model with a SQLAlchemy connection and returning the results of the machine learning model back to Postgres.

### Data Exploration
Tableau was utilized to help us visualize our data and better understand what features might contribute towards a machine learning model. It can be found here: [Link to Dashboard](https://public.tableau.com/views/Capstone_Project_Workbook/FinalStory?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link). 
Fields pertaining to the mission (ie. base, mission phase, etc.) and the aircraft (ie. aircraft name, ejection seat availability, etc.) were visualized. Pilot status was used as a color marker to reveal the breakdown between KIA and survived for each of these fields. Some of the terms found in this dashboard may not be familiar to many readers. A list of these key terms: **KIA - Killed in Action**, **MIA - Missing in Action**, **POW - Prisoner of War**, **SAM - Surface-to-Air Missile**, **AAA - Anti-Aircraft Artillery**, **MIG - Soviet-built fighter aircraft**

![](https://github.com/MichaelG-B/Capstone_Project/blob/079f57a4a71d2260850d1bd086ffb723479870e6/Final_crash_locations_gif.gif)

#### Interactive Map of Crash Locations:
A simple map of KIA crashes in red and survived in blue was initially created in Tableau and shown in the gif above. The ability to map crash locations presented an interesting opportunity to build a map with user interactivity. As such, an interactive map was built using D3.js in conjunction with Leaflet and is embedded into our Tableau story. Users can where users can select a crash location and see key crash info and a picture of the plane involved. Users can also select by year in order to view crashes that occurred during a particular year. The ability to toggle between light and dark map layers has been added as well. This map is also hosted as a webpage on this Github repository. The link is: https://michaelg-b.github.io/Capstone_Project/

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

### Neural Network Test Model

The Neural Net test model was created in Google Colaboratory using Scikit-learn framework, tensorflow and pandas libraries. 

**Preprocessing Data/Feature Selection**

After creating a new data frame with the features and target variable to be used in this neural network model there were a few features that still needed to be cleaned and transformed. The Crash_Date feature had entirely too many values and it was decided to create another column named ‘Crash_Year’ that only pulled the year from the date column. This reduced the amount of unique feature values from 831 to 11. Latitude and Longitude had null values that needed to be removed. Empty string values from the Pilot_Status and Pilot_Egress columns were dropped.
** After this data cleaning there were 1134 rows and 8 columns of usable data.

**Binning/Encoding**

The Summarized_Name (Aircraft name) originally had 26 unique values and we were able to bin name counts less than 18 into 1 category, resulting in 	 11 unique values for this feature. 
The target variable needed to be converted from the 14 unique values to a binomial - KIA = 0 and Survived = 1.

The categorical features: Summarized_Name, Defense_Category, Ejection_Seats and Pilot_Egress were encoded with Scikit-Learn’s OneHotEncoder. 

** After binning these items, the final count was reduced to 847 rows and 30 columns.

Resulting features used for Neural Network:
 - Crash_Year,
 - Summarized_Name,
 - Defense_Category,
 - Ejection_Seats,
 - Pilot_Egress,
 - Latitude,
 - Longitude

Target Variable: 
 - Pilot_Status

**Processing**

Scikit-learn StandardScaler used to scaled data. Scikit-learn train_test_split used to split data into training and testing sets. There were 29 input features for Neural Network model.

**Neural Network**

Used tensorflow’s Keras module with the Sequential and Dense classes to build this classification network. There were 3 hidden layers used with a total of 10 nodes. 
 - Layer1 – 3 nodes, relu activation function
 - Layer2 – 3 nodes, relu activation function
 - Layer3 – 4 nodes, sigmoid activation function
 - Output Layer – sigmoid activation function

Due to the small amount of data going into the neural network, we kept the model simple and the amount of nodes between the number of input features (29) and output features (1). The sigmoid activation function was used in the output layer because our question is asking for a probability of pilot survival. The relu activation functions in the first two layers and the sigmoid activation function in the third layer gave me the best accuracy and loss scores through many trial and error runs. This model was trained on 100 epochs and used the ‘adam’ optimizer and ‘binary crossentropy’ for loss. The metric tested was ‘accuracy’. 

**Accuracy Results**
 - Accuracy resulted in 66.51% 
 - Loss resulted in 64.1%

These scores are mediocre in predicting the survivability of the pilot in a combat aircraft crash during the Vietnam War. Considering the question, it is not as important to have an extremely high accuracy score here, but it would have shown success in the neural network model if the score was over 75%. The loss is still fairly high here as well.

**Conclusions**

The biggest challenge was using features with enough values for a neural net model, this requirement alone eliminated various pertinent features such as: Mission Type, Target Objective, Where (the plane was) Hit, Altitude, Airspeed, etc. that would have been excellent characteristics to train the neural network on. 
The neural network was not as successful as it could have been due to the small size of the data set that it had to work with. In order for this neural network to be successfully trained on predicting pilot survivability in aircraft crash, more data would need to be provided. Additional relevant features would need to be added as well as more values to existing features. The Random Forest Model is a much better model to be used with this limited dataset. 


### Contributors

Thanks to the following people who have contributed to this project:

* [@bfox87](https://github.com/bfox87) 
* [@CPotts82](https://github.com/CPotts82) 
* [@samboest](https://github.com/samboest) 
* [@MichaelG-B](https://github.com/MichaelG-B) 


## Segment 3

### Michael Beyer - Square Role

- Worked on creating a GIF for our Crash Locations map that would skim through markers on the map by year (1962-1973)

- Worked with Ben and Clara to edit our Leaflet/D3 map we created; specifically testing out additional layers that could potentially be used.

- Worked on editing our mock slides to prepare for the final presentation.

- Updated and managed our projects github repository in order to keep a clean working repository

- Helped team members with issues/problems that arose with Github

### Samuel Boester - Triangle 
#### Initial Draft
Utilizing a scrapped database for U.S.A.F. plane crashes during the Vietnam War, multiple supervised ML models were created to see if pilot survival could be predicted by the following **1)** The ammunition or guns used to shoot down the plane "Defense type" **2)** Location data such as “Mission Phase” and home “Base” **3)** The pilot's aircraft "Aircraft Type".  Other variables existed in the database, however many observations had null values.  Therefore, usable features were limited for our model.
Considering our data types (All Categorical) and limited observations (1000-1500) an ensemble model appeared to be the best fit for our analysis.  To prove that multiple sampling techniques and logistic regression analysis were run and compared based upon balanced accuracy scores. 
#### Refinement
To improve our initial draft new features were added from supplemental datasets such “normalized” aircraft types, “normalized” defense types, Ejection Seats (Y/N) and Pilot Egress (how they exited the plane). Lastly, our location type variables Base and Mission Phase were dropped in favor of numeric longitude and latitude data.  Dropping these variables preserved enough data to meet the requirements of our analysis.  With the addition of these variables model accuracy improved from **60%** to **84%**.
#### Visualizations
For final refinement seaborn was used to visualize our confusion matrix in an easy-to-understand format.  Secondly, precision, accuracy and sensitivity scores were cleaned and sent back to our Postgres database for simple KPI visualizations on Tableau Public.
