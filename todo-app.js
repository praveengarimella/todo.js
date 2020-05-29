var task_list = []

class Task {
    constructor(name, dueDate, isDone) {
        this.taskId = Date.now();
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    toString() {
        let htmlText = '<li class="task" '
        if (this.isDone == true) {
            htmlText += 'style="color:red;" '
        }
        htmlText += 'id = "'
        htmlText += this.taskId
        htmlText += '"><div>'
        htmlText += this.name
        htmlText += ", " + this.dueDate.getDate() 
                 + "/" + this.dueDate.getMonth();
        htmlText += '<input type="checkbox" name="isDone" id="isDone" onclick="updateTask('
        htmlText += this.taskId
        htmlText += ')">';
        htmlText += '<button onclick="deleteTask(';
        htmlText += this.taskId;
        htmlText += ')">Delete</button>';
        htmlText += '</div></li>';
        return htmlText;
    }
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    let dueDate = document.getElementById("dueDate").value;
    dueDate = dueDate.split('-')
    addTask(new Task(taskName, new Date(dueDate[0], dueDate[1], dueDate[2]), false));
}

function addTask(t) {
    task_list.push(t)
    // calling  web api to update the database 
    const request = new XMLHttpRequest()
    request.open('POST', `/api/add?id=${t.taskId}&name=${t.name}&date=${t.dueDate}&done=${t.isDone}`)
    request.send()
    request.onload = () => {
        render();
        console.log(task_list)        
    }

}


function deleteTask(taskId) {
    task_list = task_list.filter(
        (t) => {
            if(t.taskId != taskId) {
                return t;
            }
        }
    );
    // TO call a web api to update the database on the server
    const request = new XMLHttpRequest()
    request.open('POST', `/api/delete?id=${taskId}`)
    request.send()
    request.onload = () => {
        render();
        console.log(task_list)        
    }
}

function taskStatus(taskId) {
    let i = 0
    for(i = 0; i < task_list.length; i++) {
        if (task_list[i].taskId == taskId) {
            return i
        }
    }
}

function updateTask(taskId) {
    let i = taskStatus(taskId)
    if (task_list[i].isDone == false) task_list[i].isDone = true
    else task_list[i].isDone = false 
    const request = new XMLHttpRequest()
    request.open('POST', `/api/update?id=${taskId}&done=${task_list[i].isDone}`)
    request.send()
    request.onload = () => {
        // update the DOM
        render();
        console.log(task_list)        
    }
}

function render() {
    const listUI = document.getElementById("todo-list")
    listUI.innerHTML = "";
    if (task_list.length === 0) listUI.innerHTML = "No tasks scheduled...!"
    task_list.forEach((task) => {
        listUI.innerHTML += task.toString();
    })
}


function init() {
    console.log("init called");

    const request = new XMLHttpRequest()
    request.open('POST', '/init')
    request.send()
    request.onload = () => {
        let data = JSON.parse(request.responseText)
        for (var id in data) {
            curr_task = new Task(data[id]['name'], new Date(data[id]['date']), data[id]['done']);
            curr_task.taskId = data[id]['id']
            if (data[id]['done'] == "true")
                curr_task.isDone = true
            else 
                curr_task.isDone = false
            task_list.push(curr_task)
        }
        console.log(task_list)
        render()
    }
}

init();