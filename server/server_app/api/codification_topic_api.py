from flask import Blueprint
from server_app.controller.codification_topic_controller import *

codification_topics_bp = Blueprint('codification_topics', __name__)

codification_topics_bp.route('/', methods=['GET'])(get_topics)
codification_topics_bp.route('/<topic_id>/sub-topics/', methods=['GET'])(get_sub_topics_topic)
