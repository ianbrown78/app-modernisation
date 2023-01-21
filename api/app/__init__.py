from flask import Flask

from config import Config
from app.extensions import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialise Flask Extensions here
    db.init_app(app)

    # Register BP here
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    @app.route("/healthcheck")
    def health_check():
        return {'status': 'ok'}

    return app