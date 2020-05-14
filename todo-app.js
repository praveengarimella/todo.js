function Task(props) {
    return <li>{props.name}, {props.dueDate}</li>
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: props.list,[props.name]:props.name};

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleAddTask(task) {
        console.log("add task clicked");
        this.state.list.push(task);
        this.setState({list: this.state.list})
    }
    handleDelete(id){
        const newList=this.state.list.filter(
            (t) => {
                if(t.id != id) 
                return t;});
        this.setState({list:newList});
        
    }
    checkvalue(id){
        const newList = this.state.list.filter((t) =>{
            if(t.id===id){
                   event.target.checked?t.name=<strike value={t.name}>{t.name}</strike>:t.name=tname;
                }
                return t;
            }
            
            )
            console.log(newList)
            this.setState({list:newList})
        }
    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) => {
                            return (
                            <div>
                            <Task key={t.id} name={t.name} dueDate={t.dueDate} />
                            <button value={t.id} onClick={() => this.handleDelete(t.id)}>Delete</button>
                            <input type="checkbox" name="isDone" onChange={() => this.checkvalue(t.id)} value={t.id}></input>
                            </div>);
                    })}
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask} />
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '',dueDate:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    deadLine(b){
        var today = new Date();
        var due=new Date(b)
        // console.log(due.getFullYear())
        return today.getTime() < due.getTime()

    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        var date= new Date(this.state.dueDate)
        if (this.deadLine(date)){
            const task = {id:Date.now(), name: this.state.value, 
            dueDate:this.state.dueDate};
            this.props.onAddTask(task);
        }else{
            const task = {id:Date.now(), name: this.state.value, 
                dueDate:"due date completed"};
            this.props.onAddTask(task);
        }
        // add the task object to the task list
        
    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="value" value={this.state.value} 
                onChange={this.handleChange}/>
                <input type="date" name = "dueDate" value={this.state.dueDate}
                onChange={this.handleChange}/>
                <input type="submit" value="Add Task" />
            </form>
        );
    }
}
function init() {    
    console.log("inside init")   
    const request=new new XMLHttpRequest()
    request.open("GET" , "/api/todo")
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        console.log(response)
        if (request.status === 200) {
            console.log("hamayya")
        }
    }
    request.send(ReactDOM.render(
        <TodoList list={[]} />,
        document.getElementById('todo')
    ));
}


