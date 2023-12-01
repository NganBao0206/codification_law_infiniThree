import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config, config_type, CORS_URL, JWT_SECRET_KEY
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt



app = Flask(__name__)
app.config.from_object(config[config_type])
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.logger.setLevel(logging.DEBUG)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
cors = CORS(app, resources={r"/api/*": {"origins": CORS_URL}})
db = SQLAlchemy(app=app)        

def create_app_test():
    app = Flask(__name__)
    app.config.from_object(config[config_type])
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.logger.setLevel(logging.DEBUG)
    return app

def create_db_test(app):
    return SQLAlchemy(app=app)        

