# Cấu hình dự án
import os
from dotenv import load_dotenv
from urllib.parse import quote
import cloudinary

# import py_vncorenlp

config_type = ''

if os.getenv('DOCKER_ENV'):
    config_type = 'production'
else:
    config_type = 'development'
    load_dotenv()
 
 
HOST = os.getenv('HOST')
CORS_URL = os.getenv('CORS_URL')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
PER_PAGE = 50

EMAIL_NAME = os.getenv('EMAIL_NAME')
EMAIL_PASSWORD = os.getenv('EMAIL_PASS')
EMAIL_RECEIVER = os.getenv('EMAIL_RECEIVER')

SQLALCHEMY_DATABASE_URI = ""

class Config:
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{os.getenv('DB_USER')}:{quote(os.getenv('DB_PASS'))}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{os.getenv('DB_USER')}:{quote(os.getenv('DB_PASS'))}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}

cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET')
)


# vncorenlp = py_vncorenlp.VnCoreNLP(save_dir= os.path.join(os.path.dirname(__file__)))
