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
