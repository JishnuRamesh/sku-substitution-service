from flask import Flask
from migrations import apply_migrations

app = Flask(__name__)

apply_migrations()

@app.route("/")
def hello_world():
    return {"msg": "success"}