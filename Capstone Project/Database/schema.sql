--Updated final join logic 11.2.22

-- Creating initial tables for Capstone_Project database
-- Creating Table with military base information
CREATE TABLE Base_Table (
	Base_Code VARCHAR (4) NOT NULL,
	Base_Name VARCHAR (40) NOT NULL,
	Latitude NUMERIC (12) NOT NULL,
	Longitude NUMERIC (12) NOT NULL,
	PRIMARY KEY (Base_Code)
);

-- Creating table with Country Information
CREATE TABLE Country_Table (
	Country VARCHAR (4) NOT NULL,
	Country_Name VARCHAR (20) NOT NULL,
	PRIMARY KEY (Country)
);

-- Creating table with Aircraft Information
CREATE TABLE Aircraft_Information (
	Aircraft_Type VARCHAR (10) NOT NULL,
	Full_Aircraft_Name VARCHAR (26) NOT NULL,
	Summarized_Name VARCHAR (26),
	Ejection_Seats VARCHAR (2) NOT NULL,
	PRIMARY KEY (Aircraft_Type)
);

SELECT * FROM aircraft_information;

-- Create Defense type table
CREATE TABLE defense_type (
	defense_type VARCHAR (80) NOT NULL,
	defense_type_new VARCHAR (20),
	PRIMARY KEY (defense_type)
);

SELECT * FROM defense_type;


-- Making new tables to work with and using JOINS
-- Create new aircraft_info table with Aircraft_SN so that it can be joined to usaf_complete
CREATE TABLE aircraft_table AS
	SELECT "Aircraft_SN", "aircraft_type", "full_aircraft_name", "summarized_name", "ejection_seats" 
	FROM aircraft_information 
	JOIN usaf_table ON "Aircraft_Type" = "aircraft_type";

-- Format Aircraft Type column name in table
ALTER TABLE aircraft_table RENAME COLUMN aircraft_type TO "Aircraft_Type";

SELECT * FROM aircraft_table;


-- Create usaf_defense table 
CREATE TABLE usaf_defense AS
	SELECT "Crash_Date", "Crash_Time", "Aircraft_Type", "Base", "Wing", "Squadron",
		"Mission_Type", "Weapon", "Target_Objective", "Ceiling_Vis", "Maneuver", "Pass", "Angle", "Altitude", 
		"Airspeed", "Mission_Phase", "Where_Hit", "Fire_Observed", "Hit_Country", "Loss_Country", "Latitude", "Longitude",
		"Defense_Type", defense_type.Defense_Type_New, "Pilot_Hit", "Pilot_Rank", "Pilot", "Pilot_Egress",
		"Pilot_Condition", "Pilot_Recovered", "Pilot_Status", "Aircraft_SN"
	FROM usaf_table
	JOIN defense_type
	ON "Defense_Type" = defense_type;

SELECT * FROM usaf_defense;

-- Create usaf_complete table 
CREATE TABLE usaf_complete AS
	SELECT "Crash_Date", "Crash_Time", usaf_defense."Aircraft_SN", usaf_defense."Aircraft_Type", aircraft_table.summarized_name, aircraft_table.ejection_seats, "Base", "Wing", "Squadron",
		"Mission_Type", "Weapon", "Target_Objective", "Ceiling_Vis", "Maneuver", "Pass", "Angle", "Altitude", 
		"Airspeed", "Mission_Phase", "Where_Hit", "Fire_Observed", "Hit_Country", "Loss_Country", "Latitude", "Longitude",
		"Defense_Type", usaf_defense.defense_type_new, "Pilot_Hit", "Pilot_Rank", "Pilot", "Pilot_Egress",
		"Pilot_Condition", "Pilot_Recovered", "Pilot_Status"
	FROM usaf_defense 
	JOIN aircraft_table 
	ON usaf_defense."Aircraft_SN" = aircraft_table."Aircraft_SN";

-- Change joined column names to reflect format of table
--ALTER TABLE usaf_complete RENAME COLUMN serial_number TO "Aircraft_SN";  This was corrected in the Schema code above
ALTER TABLE usaf_complete RENAME COLUMN ejection_seats TO "Ejection_Seats";
ALTER TABLE usaf_complete RENAME COLUMN summarized_name TO "Summarized_Name";
ALTER TABLE usaf_complete RENAME COLUMN defense_type_new TO "Defense_Category";

SELECT * FROM usaf_complete;

Select * From usaf_table
