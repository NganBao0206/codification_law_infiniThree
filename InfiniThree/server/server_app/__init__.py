from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from config import config

app = Flask(__name__)
app.config.from_object(config['production'])

db = SQLAlchemy(app=app)

api = Api(app)
        