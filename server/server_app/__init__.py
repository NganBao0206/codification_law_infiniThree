from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config, config_type, cors
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(config[config_type])

cors = CORS(app, resources={r"/api/*": {"origins": cors}})

db = SQLAlchemy(app=app)        