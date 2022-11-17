### Neural Net Test Model

The Neural Net test model was created in Google Colaboratory using Scikit-learn framework, tensorflow and pandas libraries. 

#### Preprocessing Data/Feature Selection

Biggest challenge – using features with enough values for a neural net model – this requirement alone eliminated various pertinent features such as: Mission Type, Target Objective, Where (the plane was) Hit, Altitude, Airspeed, etc. that would have been excellent characteristics to train the neural network on.

After creating a new pandas data frame with the features and target variable to be used in this neural network model there were a few features that still needed to be cleaned and transformed. The Crash_Date feature had entirely too many values and it was decided to create another column named ‘Crash_Year’ that only pulled the year from the date column. This reduced the amount of unique feature values from 831 to 11. Latitude and Longitude had null values that needed to be removed. Empty string values from the Pilot_Status and Pilot_Egress columns were dropped. ***After this data cleaning there were 1134 rows and 8 columns of usable data.***

#### Binning/Encoding

The Summarized_Name (Aircraft name) originally had 26 unique values and we were able to bin name counts less than 18 into 1 category, resulting in 11 unique values for this feature. The target variable needed to be converted from the 14 unique values to a binomial - KIA = 0 and Survived = 1.

The categorical features: Summarized_Name, Defense_Category, Ejection_Seats and Pilot_Egress were encoded with Scikit-Learn’s OneHotEncoder.
***After binning these items, the final count was reduced to 847 rows and 30 columns.***

Features used for the Neural Net Model:
- Crash_Year
- Summarized_Name
- Defense_Category
- Ejection_Seats
- Pilot_Egress
- Latitude
- Longitude

Target Variable:
- Pilot Status

#### Processing

Scikit-learn StandardScaler was used to scale the data. Scikit-learn train_test_split was used to split data into training and testing sets. There were 29 input features for Neural Network model.

#### Creating the Neural Network

Used tensorflow’s Keras module with the Sequential and Dense classes to build this classification network. There were 3 hidden layers used with a total of 10 nodes.

Layer1 – 3 nodes, relu activation function
Layer2 – 3 nodes, relu activation function
Layer3 – 4 nodes, sigmoid activation function
Output Layer – sigmoid activation function

Due to the small amount of data going into the neural network, we kept the model simple and the amount of nodes between the number of input features (29) and output features (1). The sigmoid activation function was used in the output layer because our question is asking for a probability of pilot survival. The relu activation functions in the first two layers and the sigmoid activation function in the third layer gave me the best accuracy and loss scores through many trial and error runs. This model was trained on 100 epochs and used the ‘adam’ optimizer and ‘binary crossentropy’ for loss. The metric tested was ‘accuracy’.

#### Accuracy Results

Accuracy resulted in 66.51%
Loss resulted in 64.1%
These scores are mediocre in predicting the survivability of the pilot in a combat aircraft crash during the Vietnam War. Considering the question, it is not as important to have an extremely high accuracy score here, but it would have shown success in the neural network model if the score was over 75%. The loss is still fairly high here as well.

#### Conclusions

The biggest challenge was using features with enough values for a neural net model, this requirement alone eliminated various pertinent features such as: Mission Type, Target Objective, Where (the plane was) Hit, Altitude, Airspeed, etc. that would have been excellent characteristics to train the neural network on. The neural network was not as successful as it could have been due to the small size of the data set that it had to work with. In order for this neural network to be successfully trained on predicting pilot survivability in aircraft crash, more data would need to be provided. Additional relevant features would need to be added as well as more values to existing features. The Random Forest Model is a much better model to be used with this limited dataset.
