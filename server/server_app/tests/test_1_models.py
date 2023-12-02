from . import user, user2, topic1, topic2, sub_topic1_1, sub_topic1_2, sub_topic2_1, sub_topic2_2, index1_1_1, index1_1_2, index1_1_1_1, index1_1_1_2, index1_2_1, index1_2_2, index2_1_1
from models import *


def test_user_model(db_test):
    db_test.session.add_all([user, user2])
    db_test.session.commit()

    assert user in db_test.session



def test_codification_topic_model(db_test):
    db_test.session.add_all([topic1, topic2])
    db_test.session.commit()
    assert topic1 in db_test.session


def test_codification_sub_topic_model(db_test):
    db_test.session.add_all([sub_topic1_1, sub_topic1_2, sub_topic2_1, sub_topic2_2])
    db_test.session.commit()

    assert sub_topic1_1 in db_test.session


def test_codification_index_model(db_test):
    db_test.session.add_all([index1_1_1, index1_1_2, index1_1_1_1, index1_1_1_2, index1_2_1, index1_2_2, index2_1_1])
    db_test.session.commit()

    assert index1_1_1 in db_test.session