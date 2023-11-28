from server_app import app


if __name__ == '__main__':
    app.run(debug=True)


@app.route("/")
def hello_world():
    return "Hello, World!"