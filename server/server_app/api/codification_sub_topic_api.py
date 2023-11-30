from flask import Blueprint
from server_app.controller.codification_sub_topic_controller import *

codification_sub_topics_bp = Blueprint('codification_sub_topics', __name__)

codification_sub_topics_bp.route('/<sub_topic_id>/indexes/', methods=['GET'])(get_indexes_sub_topic)
