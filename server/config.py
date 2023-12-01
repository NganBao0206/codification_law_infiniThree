# Cấu hình dự án
import os
from dotenv import load_dotenv
from urllib.parse import quote


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

class Config:
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{os.getenv('DB_USER')}:{quote(os.getenv('DB_PASS'))}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}
