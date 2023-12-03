from flask import jsonify, request
from server_app.dao.user_dao import *
from server_app import jwt
from server_app.mail import send_report
from flask_jwt_extended import jwt_required, current_user


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    print(identity)
    return get_user_by_username(identity)


@jwt_required()
def send_report_api():
    content = request.json.get("content")
    subject = request.json.get("subject")
    
    if content.strip() != "" and subject.strip() != "":
        send_report(current_user, subject_report=subject, body_report=content)
        return jsonify({"msg": "success"}), 200
    else:
        return jsonify({"msg": "empty"}), 400
