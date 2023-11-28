from flask import Blueprint, jsonify
from server_app.dao.codification_topic_dao import *
from server_app.dao.codification_sub_topic_dao import get_sub_topics_of_topic

codification_topics_bp = Blueprint('codification_topics', __name__)

@codification_topics_bp.route('/codification-topics/', methods=['GET'])
def topics():
    topics = get_all_topics()
    return jsonify([topic.to_dict() for topic in topics])
    
@codification_topics_bp.route('/codification-topics/<int:topic_id>/sub-topics/', methods=['GET'])
def get_sub_topics_topic(topic_id):
    sub_topics = get_sub_topics_of_topic(topic_id)
    return jsonify([sub_topic.to_dict() for sub_topic in sub_topics])