from server_app import app
from server_app.api.codification_topic_api import codification_topics_bp
from server_app.api.codification_sub_topic_api import codification_sub_topics_bp
from server_app.api.codification_indexes_api import codification_indexes_bp
from server_app.api.user_api import user_bp

from server_app.api.contact_api import contact_bp

from server_app.api.terminology_api import terminology_bp

from config import HOST
from flask import request

app.register_blueprint(codification_topics_bp, url_prefix='/api/codification-topics')
app.register_blueprint(codification_sub_topics_bp, url_prefix='/api/codification-sub-topics')
app.register_blueprint(codification_indexes_bp, url_prefix='/api/codification-indexes')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(contact_bp, url_prefix='/api/contact')

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
    app.run(host=HOST)
