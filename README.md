# Capstone_Project

## Segment 1
1. **Topic:**
-   An analysis of pilot survivability from U.S. aircraft combat losses during the Vietnam War.
2. **Reason this topic was selected:**
-   As a team we selected this topic because of our shared interest in historical events as well as the nature of the dataset itself. Our data sources provided many features we thought would make for an interesting story once we applied machine learning; notably key characteristics that have potential for influencing pilot survivability. We believe the challenges of analyzing this dataset give us the chance to showcase many of the skills we have learned throughout the course.
3. **Description of our source of data:**
-   Our data sources are two websites dedicated to military aviation research, those being (https://www.aviationarchaeology.com/index.asp) and (https://www.vietnamairlosses.com/index.php). Each provided data on aircraft losses, such as crash date, pilot status, base, aircraft type, etc. However, our initial ML model is working solely off of aviationarchaeology.com since there is a more complete picture of the crash characteristics on this page. All data used was obtained through the use of web scraping techniques. 
4. **Questions we hope to answer with the data:**
-   Can looking at the characteristics of each warplane crash predict whether or not the pilot survived the crash. Our ML model will seek to predict whether a pilot survived or was killed based on particular crash features like aircraft type or what armament hit the plane, for example.
5. **Description of our communication protocols:**
-   Our Team's communication is mainly through a slack channel we created, but we are also using a iMessage group chat as an informal means of communication. We also planned several Zoom calls outside of class in order to have more time to coordinate objectives and problem solve.
6. **Technologies Used:**
-  **Data Cleaning and Analysis:** All webscraping is being completed using the webscraping library BeautifulSoup. Data cleaning, organizating, and all exploratory analysis is being completed in Pandas.
-  **Database Storage:** Our database has been created in PostgreSQL. The sqlalchemy module was utilized to pull in data from our python ETL file to Postgres and from Postgres to our machine learning python file.
-  **Machine Learning:** SciKitLearn is the ML libary we are using in Python to create our model.
-  **Dashboard:** We plan to use Tableau to create an interactive dashboard and story of our findings. This will be hosted on Tableau Public.

## Segment 2

### Description of the analysis phase of the project
![Project_Outline](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Visualizations/Screenshots/Project_Outline.PNG)

### Initial Exploration Dashboard
![Initial_Exploration_Dashboard](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Visualizations/Screenshots/Initial_Exploration_Dashboard.PNG)

### Storyboard of Dashboard
![Storyboard](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Visualizations/Screenshots/Storyboard.PNG)

### Description of the data exploration phase of the project
Our raw data was first scraped using the BeautifulSoup library in Pandas.

- The data pulled from the web needed a lot of work to become useable:
- Splitting the data into multiple columns
 - Removing rows with missing data
 - Converting certain string fields to integers, datetime
 - Converting location data into decimal degrees format
- Some quick visuals and count checks were created for the characteristics/fields believed to have the most predictive influence on survivability
- A major challenge was the incompleteness of some fields within the dataset.


### Description of the analysis phase of the project
For our analysis, we asked the question can plane attributes, location and  artillery features be predictive of plane crash fatalities.  
Utilizing web scraping, the total population of plane crashes during the Vietnam War was collected.  
Our question, lends itself to supervised ML models meant to predict outcomes, such as logistic regression and ensemble models.
During our analysis phase all supervised ml models and learned sampling techniques from class were tested.  
In our initial draft Random Forest models yielded the highest accuracy.  
Further refinements included, the addition of new variables from our database, “Ejection Seat (Y/N)”, bucketed aircraft types and defense types, and Latitude and Longitude.  
These changes reduced the amount of encoded features.  
This is important as one limiting factor for our analysis, is that it heavily relies on categorical variables which may limit the power of our model.  

With the addition of Latitude and Longitude other geographic variables such as “Base Name”  and “Mission Phase” were removed due to there duplicative nature.  
Moreover Lat and Lon were preferred due to their integer data type. 
With the additional data cleaning and features our ML model improved accuracy from 60% (Draft) to 84%.

Description of preliminary data preprocessing

Description of preliminary feature engineering and preliminary feature selection, including their decision-making process

Description of how data was split into training and testing sets
✓ Explanation of model choice, including limitations and benefits Team members present a fully integrated database.

### DATABASE

![ERD_AllTables](https://github.com/MichaelG-B/Capstone_Project/blob/main/Capstone%20Project/Database/ERD_AllTables.png)

## Contributors

Thanks to the following people who have contributed to this project:

* [@bfox87](https://github.com/bfox87) 
* [@CPotts82](https://github.com/CPotts82) 
* [@samboest](https://github.com/samboest) 
* [@MichaelG-B](https://github.com/MichaelG-B) 

Accomplishments and goals moving forward-

### Clara Potts – Circle Role
- Partnered with Ben on updating the ETL file with more data cleaning code in order to export cleaned dataframe to Postgres. The new loss_locations_table was created on the ETL file and connected to Postgres with SQLAlchemy.

- Created 3 additional tables using joins in Postgres. The purpose was to create the final usaf_complete table to be used in the machine learning models. The following tables were created this week:
	- aircraft_table
	- usaf_defense
	- usaf_complete 

- Updated and maintained Schema.sql file with the SQL code for each of the new tables created. 

- Updated and maintained ERD to include all tables that are currently in the database. The ERD shows the flow of table creation starting with the uploaded dataframe from the python ETL file. The diagram flows right showing tables created by imported csv’s and joins in postgres until the final table on the far right. This is the table that the machine learning models will pull data from, usaf_complete. 

- Created preliminary model of Neural Net:
	- set up initial structure
	- in the process of working on binning and cleaning data 
	- goal is to optimize and have ready by next Tuesday

### Michael Beyer - Square Role

- Worked on finding viable options other than Tableau for our project's visuals / dashboard
	- Installed Streamlit and created a python script that connected a local Streamlit server to our Postgres SQL database
	- Uploaded our Vietnam_USAF_Losses_Cleaned_Data.csv to Google Data Studio
	- Tested Streamlit's and Google Data Studio's features and tried to determine usability for our project
	- Created a Map highlighting base locations using Mapbox API, coordinate data, and D3.

- Updated and managed our projects github repository in order to keep a clean working repository
	- Helped team members with issues/problems that arose with Github
	- Altered file structure with advice/help of team

- Collaborated with Ben in order to plan and determine best strategies for dashboard/visualizations
	- Determined that it is in our groups best interest to have our foundation for the visualization aspects of the project to be rooted in Tableau but we would work to utilize another resource such as Leaflet, D3, Mapbox API to build another map visual.
	- Additionally we planned to create this additional visual with as much interactivity as possible.

### Ben Fox - X Role

- Created initial visuals in Tableau
	- Connected Tableau Desktop to local instance of our Postgres database
	- Built an initial dashboard consisting of visuals of the fields used in our ML model

- Collaborated with Michael to plan and determine best strategies for dashboard/visualizations
	- Built a small interactive map in Leaflet to determine if a viable option for an interactive visual
	- Sketched out a storyboard that outlines our plan for a Tableau Story

- Worked with Clara to improve the data cleaning in our ETL file
	- Added code that translates the loss location coordinates into values useable for plotting on maps

### Samuel Boester - Triangle 
Initial ML Draft
- Utilizing a scrapped database for U.S.A.F. plane crashes during the Vietnam War, multiple supervised ML models were created to see if pilot fatalities could be predicted by the following 1) The ammunition or guns used to shoot down the plane "Defense type" 2) Mission Phase "Leaving, Returning, etc." 3) The pilot's aircraft "Aircraft Type" 4) The pilots home base "Base".  Other variables existed in the database, however many observations had null values.  Therefore, we were limited with the variables or features for our model.
- In light of our data types (All Categorical) and the lower amount of observations (1000-1500) an ensemble model appeared to be the best fit for our analysis.  To prove that, multiple sampling and and logistic regression analysis were run on the side.
Refinement
- To imporve our inital draft new features were added such normalized aicraft types and defense types.  Additional new variables were introduced from our database such as ejection seat(Y/N).  Lastly, the variables Base and Mission Phase were dropped in favor of numceric lognitude and latitude data.  Dropping these variables preserved enough data to meet the requirments of our analysis.  With the addition of these variables model accuracy improved from 60% to 84%.
