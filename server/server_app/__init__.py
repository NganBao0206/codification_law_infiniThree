import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config, config_type, CORS_URL, JWT_SECRET_KEY
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os


app = Flask(__name__)
app.config.from_object(config[config_type])
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.logger.setLevel(logging.DEBUG)

from langchain.embeddings import HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")


jwt = JWTManager(app)
bcrypt = Bcrypt(app)
cors = CORS(app, resources={r"/api/*": {"origins": CORS_URL}})
db = SQLAlchemy(app=app)        



