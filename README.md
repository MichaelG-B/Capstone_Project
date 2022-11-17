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

### Database

PostgreSQL was used to store and further transform data for ease of use in creating visualizations and the machine learning model. The original table, *usaf_table*, was brought into Postgres using SQLAlchemy from the Vietnam_Losses_ETL file. This initial table was used as the basis for the supplementary tables and to create our final table. 

The database stores static data in the form of 11 tables. These tables include the original *usaf_table* brought in from the python ETL file, five supplementary data tables, three tables that were created through joins, and one table that was generated solely to build the geojson file for the interactive map. The final table holds the results of the machine learning model.

### ERD
![ERD_AllTables](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Database/ERD_AllTables.png)

Supplementary tables were created to expand on or clean the data from the original *usaf_table*. Through additional research from www.vietnamairlosses.com, wikipedia, and various other sources, the team created and imported csv files into the following postgres tables: *aircraft_information*, *base_table*, *loss_locations_table*, *country_table*, and *defense_type* tables. The *aircraft_information* table expanded the abbreviated 'Aircraft Type' feature to include full aircraft name and summarized name as well as added an ejection seat feature. *Base_table* and *country_table* both expanded on abbreviated data by including full country names and complete base names along with the latitude and longitude of each base. The *defense_type* table was created to clean and categorize the multitude of values in the original 'Defense Type' feature. Finally, the *loss_locations_table* was produced with cleaned and converted (to decimal degrees) latitude and longitude data.

The database includes three separate joins that were steps in the process to generate our final table, *usaf_complete*. The first join created the *aircraft_table* and connected the original *usaf_table* with the supplementary *aircraft_information* table in order to update the unique aircraft serial number to include 'full_name' and 'summarized_name' of each aircraft type as well as ejection seat status. The second join generated the *usaf_defense* table by uniting our original table with the supplementary *defense_type* table so that each aircraft serial number would contain the new categorized defense type. The final join produced the ultimate *usaf_complete* table by connecting the newly made *aircraft_table* with the newly made *usaf_defense* table. The final *usaf_complete* table encompassed expanded and supplemental data into a clean and straightforward table to be used by the machine learning model and visualizations. 

The database interfaces with the project through the SQLAlchemy connection from the ETL file to Postgres. The Postgres database is also interfaced with the machine learning file by bringing data to the model with a SQLAlchemy connection and returning the results of the machine learning model back to Postgres.

### Data Exploration
Tableau was utilized to help us visualize our data and better understand what features might contribute towards a machine learning model. It can be found here: [Link to Dashboard](https://public.tableau.com/views/Capstone_Project_Workbook/FinalStory?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link). 
Fields pertaining to the mission (ie. base, mission phase, etc.) and the aircraft (ie. aircraft name, ejection seat availability, etc.) were visualized. Pilot status was used as a color marker to reveal the breakdown between KIA and survived for each of these fields. Some of the terms found in this dashboard may not be familiar to many readers. A list of these key terms: **KIA - Killed in Action**, **MIA - Missing in Action**, **POW - Prisoner of War**, **SAM - Surface-to-Air Missile**, **AAA - Anti-Aircraft Artillery**, **MIG - Soviet-built fighter aircraft**

![](https://github.com/MichaelG-B/Capstone_Project/blob/079f57a4a71d2260850d1bd086ffb723479870e6/Final_crash_locations_gif.gif)

#### Interactive Map of Crash Locations:
A simple map of KIA crashes in red and survived in blue was initially created in Tableau and shown in the gif above. The ability to map crash locations presented an interesting opportunity to build a map with user interactivity. As such, an interactive map was built using D3.js in conjunction with Leaflet and is embedded into our Tableau story. Users can where users can select a crash location and see key crash info and a picture of the plane involved. Users can also select by year in order to view crashes that occurred during a particular year. The ability to toggle between light and dark map layers has been added as well. This map is also hosted as a webpage on this Github repository. The link is: https://michaelg-b.github.io/Capstone_Project/

#### Map Snapshot:
![Leaflet_Snapshot](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Visualizations/Screenshots/Final_Leaflet_Snapshot.PNG)


### ML Analysis
After our data exploration phase and a general idea of what features we would select for testing, several supervised models were tested to answer our question:

"Can pilot survivability be predicted with military data such as plan type, location data (Base, Mission Phase, Lat/Lon), defense type (artillery used to down the plan), and aircraft features (ejection seat Y/N)?" 

#### Pre-Processing
To preserve data in Postgres, we decided to conduct some final pre-processing in our ML script.  Our pre-processing included removal of nulls and string values such as "_".  Our binomial target variable, "Survived” was created through mapping Pilot_Status to either a 0 or 1, with 1 indicating pilot survival. Lastly, we dummy coded all categorical variables and scaled our data using StandardScaler.  

#### Feature Selection and Initial Model Testing 
Feature selection was limited due to the number of nulls in the dataset.  Moreover, many variables were categorical requiring dummy coding and generated 44 columns.  As a result, we did not use a correlation matrix to select features, and rather used Tableau to gain a general idea of what variables to test.  The models that were tested included: Decision Tree, Random Forest, and Multi-Logistic Regression with multiple sampling techniques.  After testing different features, we selected Aircraft_type, Mission_Phase, Base, Defense_Category. All models were trained and split using Sklearn, but did not require balancing since our target variable was fairly balanced (Survived = 732 vs Did Not Survive = 402). In our initial tests, the Random Forrest model out preformed all other models with an accuracy score 60% vs 55% from all other models.  

#### Refinement and Final Model
To improve our initial Random Forest model, new features were added from supplemental datasets such “summarized” aircraft types, “summarized” defense types, Ejection Seats (Y/N) and Pilot Egress (how they exited the plane). Lastly, our location type variables Base and Mission_Phase were dropped in favor of numeric longitude and latitude data. With the addition of these variables the model's accuracy improved from **60%** to **84%**.

#### Confusion Matrix
The below confusion matrix was created with the package Seaborn.  This package allows us to clearly identify the true positive/negative and false positive/negative percentages of our total predictions.  We can easily see that TP and TF predictions equate to our model's accuracy score of 84%.  Despite the limitations of our data (nulls, available features, and mainly categorical variables), we believe our model preformed quite well and answers the question... **Yes** plane, defense, and location variables were indeed able to predict survivability during the Vietnam War. 
 
![](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Machine%20Learning/resources/cm_heatmap.png)

*As an addition, the team wanted to experiment with nueral networks, however this model was not chosen.  Please see our below nueral network test.*  

### Neural Network Test Model
A neural network test model was created in an effort to identify the most effective machine learning model for this project. The small amount of data was a concern while creating this model but we needed confirmation for ruling out the neural network for use in this case. 

The neural net model was created in Google Colaboratory using Scikit-learn framework, tensorflow and pandas libraries. The neural network was preprocessed in the same way as the Random Forest Model. The features and target variable in the neural network model were also the same with the exception of using a 'Crash_Year' feature as well. After binning and encoding the feauture values, the final dataset count was reduced to 847 rows and 30 columns. The data was then processed like the machine learning model using Scikit-learn StandardScaler and train_test_split to split data into training and testing sets. **At this point the fact that there were less than 1000 rows of data was a major deterrent for using the neural network as our primary model for this project**. 

Due to the small amount of data going into this model we kept our neural network relatively simple using three layers, 10 nodes and a combination of relu and sigmoid actvation functions. After refining and optimizing the model, the accuracy results reached **66.51%** with a loss of **64.1%**.
These scores are mediocre in predicting the survivability of the pilot in a combat aircraft crash during the Vietnam War. Considering the question, it is not as important to have an extremely high accuracy score here, but it would have shown success in the neural network model if the score was over 75%. 

**Conclusions**

The biggest challenge was using features with enough values for a neural net model, this requirement alone eliminated various pertinent features such as: Mission Type, Target Objective, Where (the plane was) Hit, Altitude, Airspeed, etc. that would have been excellent characteristics to train the neural network on. 
The neural network was not as successful as it could have been due to the small size of the data set that it had to work with. In order for this neural network to be successfully trained on predicting pilot survivability in aircraft crash, more data would need to be provided. Additional relevant features would need to be added as well as more values to existing features. For a detailed description of the Neural Net Model please see the ReadMe in the Machine Learning/NeuralNet_Test folder.

### Future Analysis Possibilities

Taking a look at some future analysis efforts we would consider if we were to continue with the project or simply had more time during our analysis, we would conduct more research on some of the features in the dataset that were simply missing too many data points.

Some of the features we think would be valuable to research include non-categorical variables such as plane dimensions (size) instead of plane type, location on the plane where hit by enemy fire, and flight patterns such as maneuver, pass, or angle.



### Contributors

Thanks to the following people who have contributed to this project:

* [@bfox87](https://github.com/bfox87) 
* [@CPotts82](https://github.com/CPotts82) 
* [@samboest](https://github.com/samboest) 
* [@MichaelG-B](https://github.com/MichaelG-B) 
