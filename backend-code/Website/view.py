###################################################################################
# AIM :  Handles a specific route or URL endpoint. It defines what
#        the application should return to the user when a particular endpoint is accessed.
##################################################################################

# importing the required libraries
from flask import Blueprint, render_template, jsonify, request
import pandas as pd 
import pickle


car_prediction_page_blueprint = Blueprint('home', __name__) # <-- initialising the blue print for views 
cars_data = pd.read_csv('./Application_Database/clean_data.csv') # <-- Loading the entire dataset into the dataframe .

with open('./Application_Database/LinearRegressionModel.pkl', 'rb') as file: # <-- load pickle file in read binary mode
    lr_model = pickle.load(file) # create the model using pickle file


@car_prediction_page_blueprint.route("/", methods=['GET', 'POST']) # <-- decorator 
def home():
    """
        aim : This function accepts the get and post request . Responsible for sending the records
        and retrieve the specific record . 
        
        parameter : 

        return : CASE I : GET { previous record of all data from dataframe . dtype-json}
                 CASE II : POST { output of the Linear regresson model . dtype-json} 

    """

    if request.method == "POST":
        # Block execute when request is of type post .

        data = request.get_json()
        print(data)
        name = data['name'] # <-- retrieve name from request 
        company = data['company'] # <-- retrieve company from request 
        year = int(data['year']) # <-- retrieve year from request 
        fuel_type = data['fuel_type'] # <-- retrieve fuel_type from request 
        kms_traveled = int(data['kms_traveled']) # <-- retrieve kms_driven from request 

        data = [
            [name, company, year, kms_traveled, fuel_type]
        ] # <-- club all the data for the dataFrame

        output = lr_model.predict(pd.DataFrame(data, columns=['name','company','year','kms_driven','fuel_type'])) # Getting Prediction using linear Regression Model
        # print(output)
        return jsonify({'predicted_price': float(output[0])})
    
    companies = sorted(cars_data['company'].unique().tolist(), reverse=False) # <-- car companies data from dataframe
    name = sorted(cars_data['name'].unique().tolist(), reverse=False) # <-- car name data from dataframe
    year = sorted(cars_data['year'].unique().tolist(), reverse=True) # <-- car purchase year data from dataframe
    fuel_type = sorted(cars_data['fuel_type'].unique().tolist(), reverse=False) # <-- car fuel_type data from dataframe
    
    data = {
        'company_data': companies,
        'name' : name,
        'year' : year,
        'fuel_type': fuel_type
    } # <-- club all the data together to perform jsonify 

    return jsonify(data) # <-- perform jsonify on data and return