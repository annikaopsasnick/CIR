# Gevent needed for sockets
from gevent import monkey
monkey.patch_all()

# Imports
import os
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from config import basedir

# Configure app
socketio = SocketIO()
templatefolder = basedir+"/webapp/build"
staticfolder = basedir+"/webapp/build/static"

app = Flask(__name__, template_folder=templatefolder, static_folder=staticfolder)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# DB
db = SQLAlchemy(app)

# Import + Register Blueprints
from app.accounts import accounts as accounts
app.register_blueprint(accounts)
from app.irsystem import irsystem as irsystem
app.register_blueprint(irsystem)

# Initialize app w/SocketIO
socketio.init_app(app)

# @app.route('/', methods=['GET'], defaults={'path': ''})
# @app.route('/<path:path>')
# def index(path):
#     return render_template("index.html")

# HTTP error handling
@app.errorhandler(404)
def not_found(error):
  # return render_template("404.html"), 404
    return '',200
