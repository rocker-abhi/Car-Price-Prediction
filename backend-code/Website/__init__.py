###################################################################################
#
# AIM :  Hold all the necessary value that is required to run the flask backend .
#
##################################################################################

# importing libraries
from flask import Flask
from .view import car_prediction_page_blueprint

key = "myNameIsAbhishek" # <-- Secreat Key

def create_app():
    """
        aim : When this function is called it binds all the necessary variable which is required to
            run the flask application .
        
        parameter : None 

        return : app { d_type: Flask_app }

    """
    app = Flask(__name__) # <-- Initialise the Flask app 
    app.secret_key = key # <-- bind secreat key with app 
    app.register_blueprint(car_prediction_page_blueprint) # <-- Registing the blue print with flask app
    
    return app 