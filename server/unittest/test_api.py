from server_app.dao.codification_topic_dao import get_all_topics
def test_get_all_topics():
    topics = get_all_topics()
    print(topics)
    assert len(topics) == 45  # Kiểm tra số lượng chủ đề trả về

