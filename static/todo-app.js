let taskList = []

class Task {
    constructor(name, dueDate, isDone) {
        this.taskId = Date.now();
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    toString() {
        let htmlText = '<li class="task" ><div>'
        htmlText += this.name
        htmlText += ", " + this.dueDate;
        if(this.isDone){
            htmlText += 'Done' 
        }
        else {
            htmlText += '<input type="checkbox" name="isDone" id="isDone" onclick="isDone('+this.taskId+')">' 
        }
        
        htmlText += '<button onclick="deleteTask(';
        htmlText += this.taskId;
        htmlText += ')">Delete</button>';
        htmlText += '</div></li>';
        return htmlText;
    }
}

function render() {
    const listUI = document.getElementById("todolist")
    listUI.innerHTML = "";
    if (taskList.length === 0) listUI.innerHTML = "No tasks todo :-)"
    taskList.forEach((task) => {
        listUI.innerHTML += task.toString();
    })
}

function deleteTask(taskId) {
    taskList = taskList.filter(
        (t) => {
            if(t.taskId != taskId) 
            return t;
        }
    );
    // call a web api to update the database on the server
    
    // update the DOM
    render()
    console.log(taskList);
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate=document.getElementById("dueDate").value;
    console.log(dueDate)
    addTask(new Task(taskName, dueDate,false));
}

function addTask(t) {
    taskList.push(t)
    // call a web api to update the database on the server
    console.log(57+" "+t.taskName)
    console.log(58+" "+t.dueDate)
    console.log(59+" "+t.isDone)
    var req=new XMLHttpRequest();
    var url="/api/addtask";
    req.open("POST",url,true);
    req.setRequestHeader("Content-Type","application/json","crossDomain",true);
    req.onreadystatechange=function() {
        if(req.readyState===4 && req.status===200) {
            var json=JSON.parse(req.responseText);
        }
    };
    var data=JSON.stringify({"taskId":t.taskId,"taskName":t.taskName,"dueDate":t.dueDate,"isDone":t.isDone});
    req.send(data);
    render();
    console.log(taskList)
}

function isDone(taskId) {
    taskList=taskList.filter(
        (t) => {
            if(t.taskId==taskId) {
                t.isDone=true;
            }
            return t;
        }
    );
    render()
}

function init() {
    var req=new XMLHttpRequest();
    var url="http://127.0.0.1:5000/api/tasks";
    req.open("GET",url,true);
    req.setRequestHeader("Content-Type","application/json","crossDomain",true);
    req.onreadystatechange=function() {
        if(req.readyState===4 && req.status===200) {
            var json=JSON.parse(req.responseText);
            console.log(req.responseText)
        }
    };
    req.send();
    console.log("init called");

    // call a web api to retrieve the task list
    // write a function to send a api request
    // get the JSON
    // assign it to taskList
    // render

    // task = new Task("welcome task", new Date("May 30, 2020"), false);
    // addTask(task);
    // console.log(task);
}

init();