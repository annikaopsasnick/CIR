from flask import Blueprint

# Define a Blueprint for this module (mchat)
irsystem = Blueprint('irsystem', __name__, url_prefix='/',template_folder="../webapp/build", static_folder="../webapp/build/static")

# Import all controllers
from .controllers.search_controller import *