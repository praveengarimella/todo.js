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
        htmlText += '<input type="checkbox" name="isDone" id="isDone">'
        htmlText += '<button onclick="deleteTask(';
        htmlText += this.taskId;
        htmlText += ')">Delete</button>';
        htmlText += '</div></li>';
        return htmlText;
    }
}

function render() {
    // console.log("hai")

    const listUI = document.getElementById("todolist")
    listUI.innerHTML = "Nothing";
    if (taskList.length === 0) listUI.innerHTML = "No tasks todo :-)"
    taskList.forEach((task) => {
        // console.log("hai")
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
    const request = new XMLHttpRequest();
    request.open('POST', '/api/deleteTask');

    //request onload
    request.onload = () => {

      
      // Extract JSON data from request
      const data = JSON.parse(request.responseText);

   
  }

    // Add data to send with request
    const data = new FormData();
  //   var myJSON = JSON.stringify(t);
    data.append("taskId",t.taskId);

    // update the DOM
    render();
    console.log(taskList)

    // Send request

    request.send(data);
    return false;
    
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    console.log(taskName)
    addTask(new Task(taskName, new Date(), false));
}

function addTask(t) {
    taskList.push(t)
    // call a web api to update the database on the server
    console.log("hi",t)
    const request = new XMLHttpRequest();
          request.open('POST', '/api/addTask');

          //request onload
          request.onload = () => {

            
            // Extract JSON data from request
            const data = JSON.parse(request.responseText);

         
        }

          // Add data to send with request
          const data = new FormData();
        //   var myJSON = JSON.stringify(t);
          data.append("taskId",t.taskId);
          data.append("name",t.name);
          data.append("dueDate",t.dueDate);
          data.append("isDone",t.isDone);






    // update the DOM
          render();
          console.log(taskList)
          // Send request

          request.send(data);
          return false;



}

function init() {
    console.log("init called");

    // call a web api to retrieve the task list
    // write a function to send a api request
    // get the JSON
    // assign it to taskList
    // render

    var task = new Task("welcome task", new Date("May 30, 2020"), false);
    addTask(task);
    console.log(task);
}

init();