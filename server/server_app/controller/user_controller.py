

def api_user_register():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    print(email)
    name = request.json.get('name', None)
    password = request.json.get("password", None)
    confirmPass = request.json.get("confirmPassword", None)
    user = dao.add_user_api(name = name, username = username, password = password, email = email)
    print(user)
    return jsonify({"msg": "register sucess"}), 201
    # return jsonify({"msg": "register failed"}), 400