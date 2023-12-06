from flask import Blueprint
from server_app.controller.contact_controller import *

contact_bp = Blueprint('contact', __name__)

contact_bp.route('/', methods=['POST'])(send_report_api)

