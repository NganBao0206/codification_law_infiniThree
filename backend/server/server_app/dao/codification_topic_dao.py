from server_app import db
from models import CodificationTopic

def get_all_topics():
    return db.session.query(CodificationTopic).all()