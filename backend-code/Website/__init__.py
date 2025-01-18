from flask import Flask
from view import car_prediction_page_blueprint

def create_app():

    app = Flask(__name__)
    app.secret_key = "myNameIsAbhishek"
    app.register_blueprint(car_prediction_page_blueprint)
    
    return app 