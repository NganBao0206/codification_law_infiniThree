from models import *
from server_app.dao.codification_topic_dao import get_all_topics
from . import topic1, topic2


def test_get_all_topics(db_test):    
    topics = get_all_topics()
    assert len(topics) == db_test.session.query(CodificationTopic).count()
    assert db_test.session.query(CodificationTopic).first() in topics
    assert topic1 in topics
    assert topic2 in topics
