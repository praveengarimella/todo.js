let taskList = []
let currDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
class Task {
    constructor(name, currentDate, isDone, dueDate) {
        this.taskId = Date.now();
        this.name = name;
        this.currentDate = currentDate;
        this.isDone = isDone;
        this.dueDate = dueDate;
    }

    toString() {
        let htmlText = '<li class="task" ><div class ="eachTask">'
        htmlText += this.name
        htmlText += ", " + this.currentDate.getDate() +
            "/" + (this.currentDate.getMonth() + 1);
        htmlText += ", " + "Due date: " + this.dueDate
        htmlText += '<input type="checkbox" onclick="strk()" name="isDone" id="isDone">'
        htmlText += '<button onclick="deleteTask(';
        htmlText += this.taskId;
        htmlText += ')">Delete</button>';
        htmlText += '</div></li>';
        return htmlText;
    }
}

function strk() {
    console.log("called")
    var a = document.querySelectorAll("#isDone")
    for (let i = 0; i < a.length; i++) {
        if (a[i].checked === true) {
            taskList[i].isDone = true;
            taskList[i].name = "<strike>" + taskList[i].name + "</strike>";
            render()
            document.getElementById("isDone").checked = true;

        }
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
            if (t.taskId != taskId)
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
    const dueDate = document.getElementById("dueDate").value;
    let msg = document.getElementById("message");

    if (dueDate < currDate) {
        msg.style.display = "block";
        return
    } else {
        msg.style.display = "none";
    }


    addTask(new Task(taskName, new Date(), false, dueDate));
}

function addTask(t) {
    taskList.push(t)
    // call a web api to update the database on the server
    render();
    console.log(taskList)
}

function init() {
    console.log("init called");

    // call a web api to retrieve the task list
    // write a function to send a api request
    // get the JSON
    // assign it to taskList
    // render
    // var dueDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    task = new Task("welcome task", new Date("May 30, 2020"), false, currDate);
    addTask(task);
    console.log(task);
}

init();