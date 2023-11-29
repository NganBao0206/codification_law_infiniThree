from server_app import app
from server_app.api.codification_topic_api import codification_topics_bp
from server_app.api.codification_sub_topic_api import codification_sub_topics_bp
from server_app.api.codification_indexes_api import codification_indexes_bp
from config import host

app.register_blueprint(codification_topics_bp)
app.register_blueprint(codification_sub_topics_bp)
app.register_blueprint(codification_indexes_bp)

@app.route('/')
def home():
    return "test jenkins"

if __name__ == '__main__':
    app.run(host=host)
