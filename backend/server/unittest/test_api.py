from server_app.api.codification_topic_api import get_all_topics
from server_app.api.codification_sub_topic_api import get_sub_topics_of_topic
from server_app.api.codification_indexes_api import get_indexes_sub_topic, get_indexes_child

def test_get_all_topics():
    topics = get_all_topics()
    print(topics)
    assert len(topics) == 45  # Kiểm tra số lượng chủ đề trả về

