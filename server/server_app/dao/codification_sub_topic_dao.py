from server_app import db
from models import CodificationSubTopic

def get_sub_topics_of_topic(topic_id):
    return db.session.query(CodificationSubTopic).filter_by(topic_id=topic_id)\
        .order_by(CodificationSubTopic.order)\
        .all()


def get_sub_topics():
    return db.session.query(CodificationSubTopic)\
        .order_by(CodificationSubTopic.order)\
        .all()
        