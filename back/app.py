from flask import Flask
from migrations import apply_migrations
from flask import request
from models.subs import Sub_options
from playhouse.shortcuts import model_to_dict
from flask_cors import CORS

app = Flask(__name__)

CORS(
    app,
    resources={r"*": {"origins": '*'}},
    supports_credentials=True,
)

apply_migrations()

@app.route("/")
def status():
    return {"msg": "success"}


@app.route("/sku-sub-options/<order_id>", methods=['GET'])
def order(order_id):
    if request.method == 'GET':
        try:
            print(order_id)
            options = Sub_options.select().where(Sub_options.order_id == order_id)
            available_options = [model_to_dict(item) for item in options]
            return {"options_available": available_options}, 200
        except Exception:
            return {"msg": "Something went wrong"}, 500


