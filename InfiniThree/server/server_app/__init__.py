from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from config import config, config_type

app = Flask(__name__)
app.config.from_object(config[config_type])

db = SQLAlchemy(app=app)

api = Api(app)
        