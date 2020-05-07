from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route("/api/todo/", methods=["POST", "GET"])
def index():
    if request.method == "GET":
        with open("task.json", "r") as read_file:
            data = json.load(read_file)
            print(data)
            print("hello")
            return jsonify(data), 200
    return "<h1>Hello</h1>"


if __name__ == "__main__":
    app.run()
