let taskList = [];

class Task {
  constructor(taskId, taskName, dueDate, isDone) {
    this.taskId = taskId;
    this.taskName = taskName;
    this.dueDate = dueDate;
    this.isDone = isDone;
  }
}

function convertToTask(obj) {
  if (typeof obj !== Task);
  {
    return new Task(obj.taskId, obj.taskName, obj.dueDate, obj.isDone);
  }
  return obj;
}
function addListElement(t) {
  let row = document.createElement("tr");
  row.className = "task";

  let statusCell = document.createElement("td");
  statusCell.className = "container";

  let status = document.createElement("input");
  status.setAttribute("type", "checkbox");
  status.id = t.taskId;
  status.addEventListener("click", function (e) {
    checkboxChange(e);
  });
  if (t.isDone) {
    row.classList.add("completed");
    status.checked = "checked";
  } else {
    status.removeAttribute("checked");
  }

  statusCell.appendChild(status);

  let name = document.createElement("th");
  name.innerText = t.taskName;

  let dateCell = document.createElement("td");
  dateCell.innerText = t.dueDate;

  let deleteButtonCell = document.createElement("td");

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.id = t.taskId;
  deleteButton.addEventListener("click", function (e) {
    deleteTask(e);
  });

  deleteButtonCell.appendChild(deleteButton);

  row.appendChild(statusCell);
  row.appendChild(name);
  row.appendChild(dateCell);
  row.appendChild(deleteButtonCell);

  return row;
}

function createTask() {
  let taskName = document.getElementById("taskName").value.trim();
  let dueDate = document.getElementById("dueDate").value;

  if (validateDueDate(dueDate)) {
    addTask(new Task(Date.now(), taskName, dueDate, false));
  } else {
    if (!document.body.contains(document.getElementById("errorMessage"))) {
      let ele = document.createElement("h3");

      ele.setAttribute("id", "errorMessage");
      ele.innerHTML = "";
      ele.innerHTML = "Please enter a valid due date.";
      ele.style.color = "red";

      document.getElementById("error").appendChild(ele);
    }
  }
}

function addTask(t) {
  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";

  taskList.push(t);

  // Call a web api to update the database on the server
  postTaskList();

  render();
  console.log(JSON.stringify(taskList));
}

function postTaskList() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(taskList));
}

function deleteTask(e) {
  let taskId = e.target.getAttribute("id");
  taskList = taskList.filter((t) => {
    if (t.taskId != taskId) return t;
  });

  // call a web api to update the database on the server
  postTaskList();

  // update the DOM
  render();

  // console.log(taskList);
}

function render() {
  const listUI = document.getElementById("todolist");
  listUI.innerHTML = "";

  // Get taskList from an API call
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", "/tasks", false);

  xhttp.send();
  taskList = JSON.parse(xhttp.response);
  // data.forEach((node) => {
  //   // convertToTask(node);
  //   let thisTask = taskList.find((t) => t.taskId === taskId);
  //   if (thisTask === undefined) taskList.push(node);
  // });
  // // console.log(taskList);
  // return taskList;

  // TODO: update this section
  if (taskList.length === 0) listUI.innerHTML = "<h3>No tasks todo :)</h3>";
  taskList.forEach((task) => {
    listUI.appendChild(addListElement(task));
  });
}

function validateDueDate(dueDate) {
  today = new Date();
  parsedDueDate = new Date(
    dueDate.split("-")[0],
    dueDate.split("-")[1] - 1,
    dueDate.split("-")[2]
  );
  if (parsedDueDate >= today) return true;
  return false;
}

function checkboxChange(e) {
  console.log(e);
  let taskId = e.target.getAttribute("id");
  let changedTask = document.getElementById(String(taskId));

  let thisTask = taskList.find((t) => t.taskId === parseInt(taskId));

  if (changedTask.checked) {
    changedTask.parentElement.parentElement.classList.add("completed");
    thisTask.isDone = true;
  } else {
    changedTask.parentElement.parentElement.classList.remove("completed");
    thisTask.isDone = false;
  }
  postTaskList();
}

function init() {
  console.log("init called");

  // call a web api to retrieve the task list
  // write a function to send a api request
  // get the JSON
  // assign it to taskList
  // render

  render();
  console.log(taskList);
}
