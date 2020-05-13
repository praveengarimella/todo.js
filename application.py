import os
from flask import *
#from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
app.run(host='0.0.0.0')
app.secret_key = "test" 
# CORS(app, support_credentials=True) 
#CORS(app)

# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "filesystem"
# Session(app)

@app.route("/")
def index():
    return render_template("index.html");


@app.route("/api/tasks")
def tasks():
    if 'tasks' in session:  
        s = session['tasks']
    else:
        session['tasks']={}
        s = session['tasks']
    return s

@app.route("/api/addtask", methods=['POST'])
#@crossdomain(origin='*')
# @cross_origin(supports_credentials=True)
def addtask():
    
    json = request.get_json()
    print(json)
