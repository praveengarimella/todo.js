import os
import datetime
from flask import Flask, session,render_template,request,redirect,url_for
from flask_session import Session
from sqlalchemy import create_engine,and_,or_
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import jsonify
from sqlalchemy import text
from werkzeug.datastructures import ImmutableMultiDict

import pickle


try :
	file = open('tasks.txt', 'rb')

# dump information to that file
# data = pickle.load(file)
	Taskdict = pickle.load(file)
	file.close()
except:
	Taskdict = {}


app = Flask(__name__)   
# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")
# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# db.init_app(app)
Session(app)
# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

Username = ""
@app.route("/")
def index():
    return render_template("index.html")

import json

@app.route("/api/addTask",methods=['POST',"get"])
def addTask():
	newTask = request.form.to_dict()
	print(f"::::::::::::::::::::::::::::::::::::::::::{newTask}")
	# Adding tasks to  dictionary  Taskdict
	Taskdict[newTask["taskId"]] = newTask
	#dumping the dictionary in tasks.txt for later use
	pickle.dump(Taskdict, open("tasks.txt", "wb"))
	return jsonify({"success": True})

@app.route("/api/deleteTask",methods=['POST',"get"])
def deleteTask():
	# print("hi")
	newTaskid = request.form.get('taskId')
	# print("hi")
	print(f">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>{newTaskid}")

	print(f"original Dictionary : {Taskdict}")
	if newTaskid in Taskdict:
		del Taskdict[newTaskid]
		print("Updated Dictionary :" , Taskdict)	
		#dumping the dictionary in tasks.txt for later use
		pickle.dump(Taskdict, open("tasks.txt", "wb"))      

	return jsonify(Taskdict)

@app.route("/api/markTask",methods=['POST',"get"])
def markTask():
	newTaskid = request.form.get('taskId')
	print(f">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>{newTaskid}")

	print(f"original Dictionary : {Taskdict}")
	if newTaskid in Taskdict:
		Taskdict[newTaskid]["isDone"]= 'true'
		print("Updated Dictionary :" , Taskdict)	
		#dumping the dictionary in tasks.txt for later use
		pickle.dump(Taskdict, open("tasks.txt", "wb"))      

	return jsonify(Taskdict)

@app.route("/api/load",methods=['get','post'])
def getTasks():
	return jsonify(Taskdict)

