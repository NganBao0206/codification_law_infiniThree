from models import *
from server_app import bcrypt


def test_user_model(db_session):
    user = User(name="Test User", username="testuser", password=bcrypt.generate_password_hash("testpassword").decode('utf-8'), email="testuser@example.com")
    user2 = User(name="Test User2", username="testuser2", password=bcrypt.generate_password_hash("testpassword2").decode('utf-8'), email="testuser2@example.com")
    db_session.add_all([user, user2])
    db_session.commit()

    assert user in db_session


def test_codification_topic_model(db_session):
    topic = CodificationTopic(id="1", name="Test Topic", order=1)
    topic2 = CodificationTopic(id="2", name="Test Topic2", order=2)

    db_session.add_all([topic, topic2])
    db_session.commit()

    assert topic in db_session


def test_codification_sub_topic_model(db_session):
    sub_topic = CodificationSubTopic(id="1", name="Test Sub Topic1.1", order=1, topic_id="1")
    sub_topic2 = CodificationSubTopic(id="2", name="Test Sub Topic1.2", order=2, topic_id="1")
    sub_topic3 = CodificationSubTopic(id="3", name="Test Sub Topic2.1", order=1, topic_id="2")
    sub_topic4 = CodificationSubTopic(id="4", name="Test Sub Topic2.2", order=2, topic_id="2")

    db_session.add_all([sub_topic, sub_topic2, sub_topic3, sub_topic4])
    db_session.commit()

    assert sub_topic in db_session


def test_codification_index_model(db_session):
    index = CodificationIndex(id="1", name="Test Index 1.1.1", order=1, index_type="Chuong", map_index="1", sub_topic_id="1")
    index2 = CodificationIndex(id="2", name="Test Index 1.1.2", order=2, index_type="Chuong", map_index="1312", sub_topic_id="1")
    index3 = CodificationIndex(id="3", name="Test Index 1.1.1.1", order=1, index_type="Dieu", map_index="1412", sub_topic_id="1")
    index4 = CodificationIndex(id="4", name="Test Index 1.1.1.2", order=2, index_type="Dieu", map_index="123123", sub_topic_id="1")

    index5 = CodificationIndex(id="5", name="Test Index 1.2.1", order=1, index_type="Chuong", map_index="1", sub_topic_id="2")
    index6 = CodificationIndex(id="6", name="Test Index 1.2.2", order=2, index_type="Chuong", map_index="1", sub_topic_id="2")

    index7 = CodificationIndex(id="7", name="Test Index 1.3.1", order=1, index_type="Chuong", map_index="1312", sub_topic_id="3")
    
    db_session.add_all([index, index2, index3, index4, index5, index6, index7])
    db_session.commit()

    assert index in db_session