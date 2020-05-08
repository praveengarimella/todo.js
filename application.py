import os
from functools import wraps
from flask import Flask, jsonify,session,render_template,request,url_for,redirect,flash

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

tasks = {}

@app.route("/") 
def index():
	return render_template("index.html")

@app.route("/api/create", methods = ["POST"])
def create():
	# print("called create")
	args = dict(request.args)
	key = args["id"]
	tasks[key] = args
	print(tasks)
	return "200"

@app.route("/api/delete", methods = ["POST"])
def delete():
	args = dict(request.args)
	key = args["id"]
	del tasks[key]
	print(tasks)
	return "200 del"

@app.route("/api/update", methods = ["POST"])
def update():
	args = dict(request.args)
	key = args["id"]
	status = args["isDone"]
	print(key)
	details = tasks[key]
	details["isDone"] = status
	tasks[key] = details
	print(tasks)
	return "200" 

@app.route("/api/todo",methods = ["POST"])
def todo():
	return jsonify(tasks)



