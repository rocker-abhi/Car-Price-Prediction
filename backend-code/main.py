###################################################################################
#
# AIM :  this is the main file executes through terminal 
#
##################################################################################

# importing lubraries
from Website import *

if __name__ == "__main__":
    # In case of import this function will not excute but only execute when called via terminal .
    app = create_app() 
    app.run(debug=False) # <-- Run Flask app with Debug mode True 