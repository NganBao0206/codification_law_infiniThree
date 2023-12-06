from flask import Blueprint
from server_app.controller.question_controller import add_question, get_questions

question_bp = Blueprint('questions', __name__)

question_bp.route('/', methods=['GET'])(get_questions)
question_bp.route('/', methods=['POST'])(add_question)
