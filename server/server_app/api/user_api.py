from flask import Blueprint
from server_app.controller.user_controller import *

user_bp = Blueprint('user', __name__)

user_bp.route('/register/', methods=['POST'])(register)
user_bp.route('/login/', methods=['POST'])(login)
user_bp.route('/existed/', methods=['GET'])(check_username_existed)
