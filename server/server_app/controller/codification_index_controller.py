from flask import jsonify
from server_app.dao.codification_index_dao import *


# [GET] - /api/codification-indexes/<indexes_id>/indexes/
def get_indexes_child(indexes_id):
    indexes = get_child_indexes_of_index(indexes_id)
    return jsonify([index.to_dict() for index in indexes])
