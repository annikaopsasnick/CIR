from flask import Blueprint
from app import templatefolder, staticfolder

# Define a Blueprint for this module (mchat)
irsystem = Blueprint('irsystem', __name__, url_prefix='/',template_folder=templatefolder, static_folder=staticfolder)

# Import all controllers
from .controllers.search_controller import *

