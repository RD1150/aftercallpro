from flask import Flask, render_template

def create_app():
    app = Flask(
        __name__,
        template_folder="../templates",
        static_folder="../static"
    )

    @app.route("/")
    def home():
        return render_template("index.html")

    @app.route("/privacy")
    def privacy():
        return render_template("privacy.html")

    @app.route("/terms")
    def terms():
        return render_template("terms.html")

    return app
