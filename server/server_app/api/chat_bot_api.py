from flask import Blueprint
from server_app.controller.chat_bot_controller import send_msg, get_msg, get_rooms

chat_bot_bp = Blueprint('chat_bot', __name__)

chat_bot_bp.route('/', methods=['POST'])(send_msg)

chat_bot_bp.route('/rooms/<room_id>/', methods=['GET'])(get_msg) 

chat_bot_bp.route('/rooms/', methods=['GET'])(get_rooms)