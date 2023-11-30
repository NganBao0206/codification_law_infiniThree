from flask import jsonify
from server_app.dao.codification_topic_dao import *
from server_app.dao.codification_sub_topic_dao import get_sub_topics_of_topic


# [GET] - /api/codification-topics/
def get_topics():
    topics = get_all_topics()
    return jsonify([topic.to_dict() for topic in topics])

# [GET] - /api/codification-topics/<topic_id>/sub-topics/
def get_sub_topics_topic(topic_id):
    sub_topics = get_sub_topics_of_topic(topic_id)
    return jsonify([sub_topic.to_dict() for sub_topic in sub_topics])