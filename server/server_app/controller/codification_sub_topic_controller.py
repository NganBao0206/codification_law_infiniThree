from flask import jsonify
from server_app.dao.codification_index_dao import get_indexes_of_sub_topic


# [GET] - /api/codification-sub-topics/<sub_topic_id>/indexes/
def get_indexes_sub_topic(sub_topic_id):
    indexes = get_indexes_of_sub_topic(sub_topic_id)
    return jsonify([index.to_dict() for index in indexes])