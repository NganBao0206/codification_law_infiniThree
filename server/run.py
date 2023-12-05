from server_app import app
from server_app.api.codification_topic_api import codification_topics_bp
from server_app.api.codification_sub_topic_api import codification_sub_topics_bp
from server_app.api.codification_indexes_api import codification_indexes_bp
from server_app.api.user_api import user_bp
from server_app.api.chat_bot_api import chat_bot_bp

from server_app.api.contact_api import contact_bp

from server_app.api.terminology_api import terminology_bp
from server_app.dao.user_dao import get_user_by_username

from config import HOST
from server_app import jwt


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    print(identity)
    return get_user_by_username(identity)


app.register_blueprint(codification_topics_bp, url_prefix='/api/codification-topics')
app.register_blueprint(codification_sub_topics_bp, url_prefix='/api/codification-sub-topics')
app.register_blueprint(codification_indexes_bp, url_prefix='/api/codification-indexes')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(contact_bp, url_prefix='/api/contact')
app.register_blueprint(chat_bot_bp, url_prefix='/api/chat-bot')
app.register_blueprint(terminology_bp, url_prefix='/api/terminologies')

@app.route('/')
def home():
    return "home page"

# @app.after_request
# def log_request_info(response):
#     app.logger.debug('URL: %s', request.url)
#     app.logger.debug('Origin: %s', request.headers.get('Origin'))
#     app.logger.debug('Headers: %s', request.headers)
#     app.logger.debug('Body: %s', request.get_data())
#     return response


if __name__ == '__main__':
    app.run(host=HOST, port=5051)
