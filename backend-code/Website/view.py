from flask import Blueprint, render_template


car_prediction_page_blueprint = Blueprint('home', __name__)

@car_prediction_page_blueprint.route("/")
def home():
    return "<h1> Created the basic Structure of the application </h1>"