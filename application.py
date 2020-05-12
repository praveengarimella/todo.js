from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route("/api/todo/", methods=["POST", "GET"])
def index():
    if request.method == "GET":
        data = request.json
        with open("task.json", "r") as read_file:
            data = json.load(read_file)
            # print(data)
            # print("hello")
            return jsonify(data), 200
    return "<h1>Bad request</h1>", 400


@app.route("/api/update/", methods=["POST", "GET"])
def update():
    if request.method == "POST":
        data = request.json
        # print(data)

        with open("task.json", "w") as write_file:
            json.dump(data, write_file)

    return "<h1>Updated</h1>", 200


if __name__ == "__main__":
    app.run()