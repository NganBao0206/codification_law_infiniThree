from flask import Blueprint, jsonify
from server_app.dao.codification_sub_topic_dao import *
from server_app.dao.codification_index_dao import get_indexes_of_sub_topic

codification_sub_topics_bp = Blueprint('codification_sub_topics', __name__)

@codification_sub_topics_bp.route('/codification-sub-topics/<int:sub_topic_id>/indexes/', methods=['GET'])
def get_indexes_sub_topic(sub_topic_id):
    indexes = get_indexes_of_sub_topic(sub_topic_id)
    return jsonify([index.to_dict() for index in indexes])
