from flask import jsonify, request
from server_app.dao.user_dao import *
from flask_jwt_extended import create_access_token
import cloudinary.uploader


def register():
    username = request.form.get("username", None)
    email = request.form.get("email", None)
    name = request.form.get('name', None)
    password = request.form.get("password", None)
    avatar = request.files.get("avatar", None)
    
    if avatar is not None:
        response = cloudinary.uploader.upload(avatar)
        avatar = response.get('secure_url')
        
    else:
        print("Không tìm thấy file")

    try:
        user = add_user(name = name, username = username, password = password, email = email, avatar=avatar)
        print(user)
        return jsonify({"msg": "register sucess"}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400



def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = auth_user(username, password)
    if user:
        access_token = create_access_token(identity=user.username)
        return jsonify({"access_token": access_token, "user": user.to_dict()}), 200
    else:
        return jsonify({"msg": "Login mismatch. Try again"}), 401




def check_username_existed():
    username = request.args.get('username', default=None, type=str)
    user = get_user_by_username(username)
    
    if user:
        return jsonify({"msg": "existed"}), 302
    else:
        return jsonify({"msg": "not existed"}), 204



def check_email_existed():
    email = request.args.get('email', default=None, type=str)
    user = get_user_by_email(email)
    
    if user:
        return jsonify({"msg": "existed"}), 302
    else:
        return jsonify({"msg": "not existed"}), 204
    



