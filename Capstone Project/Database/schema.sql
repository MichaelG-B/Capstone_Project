-- Creating initial tables for Capstone_Project database
-- Creating Table with military base information
CREATE TABLE Base_Table (
	Base_Code VARCHAR (4) NOT NULL,
	Base_Name VARCHAR (40) NOT NULL,
	Latitude VARCHAR (12) NOT NULL,
	Longitude VARCHAR (12) NOT NULL,
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
	Aircraft_Type VARCHAR (20) NOT NULL,
	Full_Aircraft_Name VARCHAR (40) NOT NULL,
	Ejection_Seats VARCHAR (4) NOT NULL,
	PRIMARY KEY (Aircraft_Type)
);

SELECT * FROM base_table;

SELECT * FROM country_table;

