from flask import Blueprint, jsonify
from server_app.dao.codification_index_dao import *

codification_indexes_bp = Blueprint('codification_indexes', __name__)

@codification_indexes_bp.route('/codification-indexes/<int:indexes_id>/children/', methods=['GET'])
def get_indexes_child(indexes_id):
    indexes = get_child_indexes_of_index(indexes_id)
    return jsonify([index.to_dict() for index in indexes])
