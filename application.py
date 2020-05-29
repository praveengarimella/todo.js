from flask import Flask, render_template, request, session, url_for, redirect, jsonify
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
import os
import datetime
import json
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

chekList = {}

with open('task.json', 'r') as openfile:
	try:
		chekList = json.load(openfile)
	except:
		pass

@app.route("/")
def index():
	return render_template("index.html")


@app.route("/init", methods=['POST'])
def init():
	return jsonify(chekList)
    

@app.route("/api/add", methods=['POST','GET'])
def add() :
	if request.method == 'POST':
		data = dict(request.args)
		chekList[data['id']] = data
		data_json = json.dumps(chekList)
		with open("tasks.json", "w") as outfile:
			outfile.write(data_json)
		return "<h1> task is added</h1>", 200
    
	return "<h1>bad request</h1>", 400

@app.route("/api/update", methods=['POST','GET'])
def update():
	if request.method == 'POST':
		data = dict(request.args)
		task_id = data['id']
		temp = chekList[task_id]
		temp['done'] = data['done']
		chekList[task_id] = temp
		data_json = json.dumps(chekList)
		with open("tasks.json", "w") as outfile:
			outfile.write(data_json)
		return "<h1>task is updated</h1>", 200
	else:
		return "<h1> bad request </h1>", 400


@app.route("/api/delete", methods=['POST','GET'])
def delete():
	if request.method == "POST":
		data = dict(request.args)
		chekList.pop(data['id'])
		data_json = json.dumps(chekList)
		with open("tasks.json", "w") as outfile:
			outfile.write(data_json)
		return "<h1> task is deleted</h1>", 200
	return "<h1>bad request</h1>", 400

