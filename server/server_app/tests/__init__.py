from models import *
from server_app import bcrypt


user = User(name="Test User", username="testuser", password=bcrypt.generate_password_hash("testpassword").decode('utf-8'), email="testuser@example.com")
user2 = User(name="Test User2", username="testuser2", password=bcrypt.generate_password_hash("testpassword2").decode('utf-8'), email="testuser2@example.com")

topic1 = CodificationTopic(id="1", name="Test Topic", order=1)
topic2 = CodificationTopic(id="2", name="Test Topic2", order=2)

sub_topic1_1 = CodificationSubTopic(id="1", name="Test Sub Topic1.1", order=1, topic_id="1")
sub_topic1_2 = CodificationSubTopic(id="2", name="Test Sub Topic1.2", order=2, topic_id="1")
sub_topic2_1 = CodificationSubTopic(id="3", name="Test Sub Topic2.1", order=1, topic_id="2")
sub_topic2_2 = CodificationSubTopic(id="4", name="Test Sub Topic2.2", order=2, topic_id="2")


index1_1_1 = CodificationIndex(id="1", name="Test Index 1.1.1", order=1, index_type="Chuong", map_index="1", sub_topic_id="1")
index1_1_2 = CodificationIndex(id="2", name="Test Index 1.1.2", order=2, index_type="Chuong", map_index="1312", sub_topic_id="1")
index1_1_1_1 = CodificationIndex(id="3", name="Test Index 1.1.1.1", order=1, index_type="Dieu", map_index="1412", sub_topic_id="1", parent=index1_1_1)
index1_1_1_2 = CodificationIndex(id="4", name="Test Index 1.1.1.2", order=2, index_type="Dieu", map_index="123123", sub_topic_id="1", parent=index1_1_1)

index1_2_1 = CodificationIndex(id="5", name="Test Index 1.2.1", order=1, index_type="Chuong", map_index="1", sub_topic_id="2")
index1_2_2 = CodificationIndex(id="6", name="Test Index 1.2.2", order=2, index_type="Chuong", map_index="1", sub_topic_id="2")

index2_1_1 = CodificationIndex(id="7", name="Test Index 1.3.1", order=1, index_type="Chuong", map_index="1312", sub_topic_id="3")
    