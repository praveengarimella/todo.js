function Task(props) {
    return <li> {props.name} {props.dueDate.toLocaleString()}&nbsp;   
		<input style={{backgroundColor: "red", width: "90px", 
		height: "30px"}} type="submit" value="Delete Task" onClick={()=>{props.onDeleteTask(props.id)}}/>
    	</li>
	}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
		
		this.state = {list: props.list};
		this.handleAddTask = this.handleAddTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}

    handleAddTask(task) {
        console.log("add task clicked");
        this.state.list.push(task);
        this.setState({list: this.state.list})
	}

	handleDeleteTask(id){
        console.log("Delete task clicked");
        this.state.list = this.state.list.filter(task =>{
            if(task.id != id)
                return task;
        })
        this.setState({list: this.state.list})
    }
	
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h2>To_Do</h2>
                <div style={{color: "red"}}>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} id = {t.id} name={t.name} dueDate={t.dueDate} onDeleteTask={this.handleDeleteTask}/>)
                    }
                </div><br />
                <TaskNameForm onAddTask={this.handleAddTask} />
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
		super(props);
		this.state = {value: '', date: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // create a task object
        event.preventDefault();
		const task = {id:Date.now(), name: this.state.value,
			dueDate: this.state.date };
        // add the task object to the task list
        this.props.onAddTask(task);
    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
	}
	
    render() {
        return(
			<div style={{alignItems: "center"}}>
				<form onSubmit={this.handleSubmit}>
					<label><b>Task name: </b></label><input style={{backgroundColor: "pink"}} type="text" onChange={this.handleChange} 
						placeholder="Enter your task here" /><br /><br />
					<label><b>dueDate: </b></label><input type="date" required onChange={() => {
						this.setState({date: new Date(event.target.value)})
					}}/>&nbsp;
					<input style={{backgroundColor: "Green", width: "90px", height: "30px"}} type="submit" value="Add Task" />
				</form>
			</div>
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);
