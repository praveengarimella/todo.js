let taskList = []

class Task {
    constructor(name, dueDate, isDone,flag) {
        if(!flag){
        this.taskId = Date.now();
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;
        }
        else{
        this.taskId = flag;
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;
        }

    }

    toString() {
        let htmlText = '<li class="task" id='+this.taskId+' ><div>'
        htmlText += this.name
        htmlText += ", " + this.dueDate ;
        htmlText += '<input type="checkbox" name="isDone" id="isDone">'
        htmlText += '<button onclick="deleteTask(';
        htmlText += this.taskId;
        htmlText += ')">Delete</button>';
        htmlText += '<button onclick="markTask(';
        htmlText += this.taskId;
        htmlText += ')">Mark</button>';
        htmlText += '</div></li>';
        return htmlText;
    }
}

function render() {
    // console.log("hai")
    console.log("render",taskList);
    const listUI = document.getElementById("todolist")
    listUI.innerHTML = " ";
    if (taskList.length === 0){
    listUI.innerHTML = "No tasks todo :-)"
    } else{
        taskList.forEach((task) => {
        // console.log("hai")        
        listUI.innerHTML += task.toString();
        if(task.isDone){
        document.getElementById(task.taskId).style.color = 'green'
        }
    })
    }
    
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
    console.log("taskID",taskId)

    // Add data to send with request
    const data = new FormData();
    data.append("taskId",taskId);

    // update the DOM
    render();
    console.log(taskList)

    // Send request

    request.send(data);
    return false;
    
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const date     = document.getElementById("Date").value;
    console.log(taskName)
    addTask(new Task(taskName, date , false,false));
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
function markTask(taskId){

    taskList = taskList.filter(
        (t) => {
            if(t.taskId == taskId){
                t.isDone = true;
            } 
            return t;
        }
    );
    render()

    const request = new XMLHttpRequest();
          request.open('POST', '/api/markTask');

          //request onload
          request.onload = () => {

            
            // Extract JSON data from request
            const data = JSON.parse(request.responseText);
            
            }

         


          // Add data to send with request
          const data = new FormData();
          data.append("taskId",taskId);
          

        




    // // update the DOM
    //       render();
    //       console.log(taskList)
    
    // Send request

          request.send(data);
          return false;
}

function loadtasks(){

    console.log('hai-123');
    const request = new XMLHttpRequest();
    request.open('POST', '/api/load');
    
    //request onload
    request.onload = () =>   {

        console.log("entered")
      // Extract JSON data from request
      const data = JSON.parse(request.responseText);
      let newTaskList=[]
      console.log(data)
      for (var x in data) {
          console.log(data[x].name,data[x].dueDate,data[x].isDone,data[x].taskId)
          if(data[x].isDone==="false"){
              data[x].isDone=false;
              console.log(data[x].isDone)
          }
          var task = new Task(data[x].name,data[x].dueDate,data[x].isDone,parseInt(data[x].taskId))
          taskList.push(task)
        //   console.log(task)s
      
      }
      console.log("tasks....",taskList)
      render()
      }

      const data =new FormData();
      data.append("Load",123);
      request.send(data);
      return false;
            
}