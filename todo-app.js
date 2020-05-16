function Task(props) {
    return <li>{props.name}, {props.tid}, {props.dueDate}, {props.delButton}</li>
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: props.list};
        this.handleAddTask = this.handleAddTask.bind(this);

    }
    handleAddTask(task) {
        console.log("add task clicked");
        this.state.list.push(task);
		console.log(task.id);
        this.setState({list: this.state.list})
    }
	
	handleDeleteTask(taskid){
		console.log(taskid);
		let i=0;
		for(i=0;i<this.state.list.length;i++){
			//console.log(i);
			if(this.state.list[i].id==taskid){				
				break;
			}
		}
		let task_list = this.state.list;
		task_list.splice(i, 1);
		this.setState({list: task_list});
		}
	
    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>				
                            <Task key={t.id} tid={t.id} name={t.name} dueDate={t.dueDate} delButton={<button onClick={() =>this.handleDeleteTask(t.id)}>Delete</button>} />)
                    }
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask} />
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {taskName: '', dueDate : ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
		console.log(event);
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const task = {id:Date.now(), name: this.state.taskName, dueDate: this.state.dueDate};
        // add the task object to the task list
        this.props.onAddTask(task);
    }

    handleChange(event) {
        // code to set the state of the component
		if(event.target.name=="taskName"){
			this.setState({taskName: event.target.value});
		}
		if(event.target.name=="dueDate"){
			this.setState({dueDate: event.target.value});
		}
        
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="taskName" value={this.state.taskName} onChange={this.handleChange} />
				<input type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleChange} />
                <input type="submit" value="Add Task" />
            </form>
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('props')
);