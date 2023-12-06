from flask import Blueprint
from server_app.controller.codification_index_controller import get_indexes_child

codification_indexes_bp = Blueprint('codification_indexes', __name__)

codification_indexes_bp.route('/<indexes_id>/children/', methods=['GET'])(get_indexes_child)

