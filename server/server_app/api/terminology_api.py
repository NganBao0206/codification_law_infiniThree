from flask import Blueprint
from server_app.controller.terminology_controller import *

terminology_bp = Blueprint('terminology', __name__)

terminology_bp.route('/', methods=['GET'])(get_terminology)
terminology_bp.route('/search-paragraph/', methods=['POST'])(search_terminology_form_paragraph)

