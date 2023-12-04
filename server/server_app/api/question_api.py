from flask import Blueprint
from server_app.controller.question_controller import add_question,get_question_by_topic, get_question_by_user, get_questions

question_bp = Blueprint('questions', __name__)

question_bp.route('/', methods=['GET'])(get_questions)
question_bp.route('/', methods=['POST'])(add_question)
question_bp.route('/topic/', methods=['GET'])(get_question_by_topic)
question_bp.route('/user/', methods=['GET'])(get_question_by_user)