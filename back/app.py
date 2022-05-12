from flask import Flask
from migrations import apply_migrations
from flask_cors import CORS

app = Flask(__name__)

CORS(
    app,
    resources={r"*": {"origins": '*'}},
    supports_credentials=True,
)

apply_migrations()

@app.route("/")
def hello_world():
    return {"msg": "success"}