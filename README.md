# Capstone_Project

## Segment 1
1. **Topic:**
-   An analysis of U.S. aircraft losses during the Vietnam War.
2. **Reason why we selected their topic:**
-   As a team we selected this topic because of our shared interest in historical events as well as the nature of the dataset itself. Our sources provided many features we thought would make for an interesting story once we applied machine learning. We believe the challenges of analyzing this data give us the chance to showcase many of the skills we have learned throughout the course.
3. **Description of our source of data:**
-   Our data sources are two websites dedicated to military aviation research, those being (https://www.aviationarchaeology.com/index.asp) and (https://www.vietnamairlosses.com/index.php). Each provided data on aircraft losses, such as crash date, pilot status, base, aircraft type, etc. However, our initial ML model is working solely off of aviationarchaeology.com since there is a more complete picture of the crash characteristics on this page. All data used was obtained through the use of web scraping techniques. 
4. **Questions we hope to answer with the data:**
-   A major question we hope to answer is what feature(s) best predict whether the pilot survived their crash or were killed. Our ML model will try to predict whether the pilot survived based on features like aircraft type and what shot them down, for example.
5. **Description of our communication protocols:**
-   Our Team's communication is mainly through a slack channel we created, but we are also using a iMessage group chat as an informal means of communication. We also planned several Zoom calls outside of class in order to have more time to coordinate objectives and problem solve.
6. **Technologies Used:**
-  **Data Cleaning and Analysis:** All webscraping is being completed using the webscraping library BeautifulSoup. Data cleaning, organizating, and all exploratory analysis is being completed in Pandas.
-  **Database Storage:** Our database has been created in PostgreSQL. The sqlalchemy module was utilized to pull in data from our python ETL file to Postgres and from Postgres to our machine learning python file.
-  **Machine Learning:** SciKitLearn is the ML libary we are using in Python to create our model.
-  **Dashboard:** We plan to use Tableau to create an interactive dashboard and story of our findings. This will be hosted on Tableau Public.

## Contributors

Thanks to the following people who have contributed to this project:

* [@bfox87](https://github.com/bfox87) 
* [@CPotts82](https://github.com/CPotts82) 
* [@samboest](https://github.com/samboest) 
* [@MichaelG-B](https://github.com/MichaelG-B) 

## Segment 2

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
	- installed Streamlit and created a python script that connected a local Streamlit server to our Postgres SQL database
	- Tested Streamlit's features and tried to determine usability for our project

- Updated and managed our projects github repository in order to keep a clean working repository
	- Helped team members with issues/problems that arose with Github


