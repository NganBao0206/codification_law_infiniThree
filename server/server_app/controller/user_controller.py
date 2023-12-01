from flask import jsonify, request
from server_app.dao.user_dao import *
from flask_jwt_extended import create_access_token, jwt_required

def register():
    username = request.form.get("username", None)
    email = request.form.get("email", None)
    name = request.form.get('name', None)
    password = request.form.get("password", None)
    print(username)
    print(email)
    print(name)
    print(password)

    try:
        user = add_user(name = name, username = username, password = password, email = email)
        print(user)
        return jsonify({"msg": "register sucess"}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400




def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = auth_user(username, password)
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token, "user": user}), 200
    else:
        return jsonify({"msg": "Login mismatch. Try again"}), 401
