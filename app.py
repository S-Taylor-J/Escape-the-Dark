from flask import Flask, render_template
app = Flask(__name__)
app.config["SECRET_KEY"] = "hiuasdfihu23!!asdf2"


@app.route("/", methods=["GET", "POST"])
def landingPage():
    return render_template("landingPage.html")

@app.route("/homepage", methods=["GET", "POST"])
def homepage():
    
    return render_template("homepage.html")
    
@app.route("/game", methods=["GET", "POST"])
def game():
    return render_template("game.html")

@app.route("/playerSelect", methods=["GET", "POST"])
def playerSelect():
    return render_template("playerSelect.html")

@app.route("/settings", methods=["GET", "POST"])
def settings():
    return render_template("settings.html")

@app.route("/howToPlay", methods=["GET", "POST"])
def howToPlay():
    return render_template("howToPlay.html")

@app.route("/credit", methods=["GET", "POST"])
def credit():
    return render_template("credits.html")