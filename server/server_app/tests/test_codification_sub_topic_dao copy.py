from models import *
from server_app.dao.codification_sub_topic_dao import get_sub_topics_of_topic
from . import topic1, topic2, sub_topic1_1, sub_topic1_2, sub_topic2_1, sub_topic2_2


def test_get_sub_topics_of_topic(db_test):    
    sub_topics = get_sub_topics_of_topic(topic1.id)
    assert len(sub_topics) == db_test.session.query(CodificationSubTopic).filter(CodificationSubTopic.topic_id.__eq__(topic1.id)).count()
    assert sub_topic1_1 in sub_topics
    assert sub_topic1_2 in sub_topics
    
    sub_topics = get_sub_topics_of_topic(topic2.id)
    assert len(sub_topics) == db_test.session.query(CodificationSubTopic).filter(CodificationSubTopic.topic_id.__eq__(topic2.id)).count()
    assert sub_topic2_1 in sub_topics
    assert sub_topic2_2 in sub_topics
        