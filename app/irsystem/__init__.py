from flask import Blueprint
import os
from pathlib import Path

basedir = os.path.abspath(os.path.dirname(__file__))
basedir = Path(basedir)
templatefolder = str(basedir.parent.parent /"webapp"/"build")
staticfolder = str(basedir.parent.parent /"webapp"/"build"/"static")


# Define a Blueprint for this module (mchat)
irsystem = Blueprint('irsystem', __name__, url_prefix='/',template_folder=templatefolder, static_folder=staticfolder)

# Import all controllers
from .controllers.search_controller import *

