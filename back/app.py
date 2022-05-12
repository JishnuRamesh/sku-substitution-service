import flask
from flask import Flask
from migrations import apply_migrations
from flask import request
from models.subs import Sub_options, Customer_subs,Orders
from playhouse.shortcuts import model_to_dict
from flask_cors import CORS
import csv
import io

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


@app.route("/sku-sub-options/<order_id>", methods=['GET', 'POST'])
def order(order_id):
    if request.method == 'GET':
        try:
            print(order_id)
            options = Sub_options.select().where(Sub_options.order_id == order_id)
            available_options = [model_to_dict(item) for item in options]
            return {"options_available": available_options}, 200
        except Exception as ex:
            print(ex)
            return {"msg": "Something went wrong"}, 500

    elif request.method == 'POST':
        try:
            substitute_data = request.json['sub_options']
            for option in substitute_data:
                Customer_subs.insert(
                    order_id=order_id,
                    recipe_name=option['recipe_name'],
                    actual_ingredient=option['actual_ingredient'],
                    substitute_ingredient=option['substitute_ingredient'],
                    order_status=option['order_status']
                ).on_conflict(conflict_target=(Customer_subs.order_id, Customer_subs.recipe_name),
                              update={Customer_subs.substitute_ingredient : option['substitute_ingredient'],
                                      Customer_subs.order_status : option['order_status']}, ).execute()
            return {"msg": "success"}, 200
        except Exception as ex:
            print(ex)
            return {"msg": "Something went wrong"}, 500


@app.route("/sku-sub-options/close/<week>", methods=['GET'])
def closeSubstitutionByWeek(week):
    columns = [
        "order_id",
        "recipe_name",
        "actual_ingredient",
        "substitute_ingredient",
        "order_status"
    ]

    try:
        substitutes = Sub_options.select().join(Orders, on=Orders.order_id == Sub_options.order_id).where(
            Orders.week == week)
        file = io.StringIO()
        writer = csv.DictWriter(file, fieldnames=columns)
        writer.writeheader()

        export = []
        for substitute_data in substitutes:
            data = {
                "order_Id": substitute_data.order_Id,
                "recipe_name": substitute_data.recipe_name,
                "actual_ingredient": substitute_data.actual_ingredient,
                "substitute_ingredient": substitute_data.actual_ingredient,
                "order_status": substitute_data.order_status,
            }
            export.append(data)

        writer.writerows(export)
        response = flask.make_response(file.read())
        response.headers['content-type'] = 'application/octet-stream'
        return response
    except Exception as ex:
        print(ex)
        return {"msg": "Data was not exported"}, 500
