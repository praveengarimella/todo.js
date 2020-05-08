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
        htmlText += ", " + this.dueDate.getDate() 
                 + "/" + this.dueDate.getMonth();
        htmlText += `<input type="checkbox" onclick="updateTask(${this.taskId})" name="isDone" id="isDone"`
        if (this.isDone == 'true')
            htmlText += ' checked'
        htmlText += '>'
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
    const request = new XMLHttpRequest()
    request.open("POST",`/api/delete?id=${taskId}`)
    request.send()
    request.onload = () => {
        render()
        console.log(taskList)
    }
    // update the DOM
    
}

function updateTask(taskID){
	let i = 0;
	for(i = 0; i < taskList.length; i++){
		if(taskID == taskList[i].taskId){
			if(taskList[i].isDone == "true"){
				taskList[i].isDone = "false"
                break
            }
			else{
				taskList[i].isDone = "true"
                break
            }
		}
	}
    const request = new XMLHttpRequest()
    request.open("POST",`/api/update?id=${taskList[i].taskId}&isDone=${taskList[i].isDone}`)
    request.send()
    request.onload = () => {
        console.log(taskID + " " + task.isDone)
        console.log(taskList)
    }

}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    let dueDate = document.getElementById("dueDate").value;
    dueDate = dueDate.split("-")
    // console.log(dueDate);
    addTask(new Task(taskName, new Date(dueDate[0],dueDate[1],dueDate[2]), "false"));

}

function addTask(t) {
    taskList.push(t)
    // call a web api to update the database on the server
    const request = new XMLHttpRequest()
    request.open("POST",`/api/create?id=${t.taskId}&name=${t.name}&dueDate=${t.dueDate}&isDone=${t.isDone}`)
    request.send()
    request.onload = () => {
        render()
        console.log(taskList)
    }
    
}

function init() {
    console.log("init called");

    // call a web api to retrieve the task list
    const request = new XMLHttpRequest()
    request.open("POST",`/api/todo`)
    request.send()
    request.onload = () => {
        const response = JSON.parse(request.responseText)     
        console.log(taskList)
        for(var key in response){
            task = new Task(response[key]["name"],new Date(response[key]["dueDate"]) , response[key]["isDone"])
            task.taskId = response[key]["id"]
            taskList.push(task)
        }
        render()
        console.log(taskList)

    }

    // write a function to send a api request
    // get the JSON
    // assign it to taskList
    // render 
}


init();