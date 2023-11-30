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
 
host = os.getenv('HOST')
cors = os.getenv('CORS_URL')

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
