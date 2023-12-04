from flask import Blueprint
from server_app.controller.reply_controller import add_reply, get_replies_by_question, get_replies_by_user

reply_bp = Blueprint('replies', __name__)

reply_bp.route('/', methods=['POST'])(add_reply)
reply_bp.route('/user', methods=['GET'])(get_replies_by_user)
reply_bp.route('/question', methods=['GET'])(get_replies_by_question)