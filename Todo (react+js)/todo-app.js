function Task(props) {
    return <li
    style={{

        color: props.task.status ? "green" : "red"
        
    }}
>       
    {props.name}, {new Date().getDate()}/{new Date().getMonth()}, <strong>Due Date:</strong> {props.dueDate} 

    <input type = "checkbox" onChange = {() =>{
        props.onChange(props.task.id);
    }}
    />

    <button value = "Delete" onClick = {() =>
        props.onDelete(props.task.id)
    }>Delete</button>
    
    </li>
}

class TodoList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {list: props.list};

        this.handleAddTask = this.handleAddTask.bind(this);
    };

    handleAddTask(task) {
        console.log("add task clicked");
        this.state.list.push(task);
        this.setState({list: this.state.list})
    };

    handleDeleteTask = (taskId) => {
		console.log('delete button clicked');
		const list = this.state.list.filter((t) => t.id !== taskId);
		this.setState({ list: list });
    };

    
    handleChange = (taskId) => {
		console.log('checkbox clicked');
		this.setState({
			list: this.state.list.map((task) => {
				if (task.id === taskId) {
					return {
						...task,
						status: !task.status
					};
				} 
				return task;
				
			})
		});
	};



    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} name={t.name} dueDate={t.dueDate} onDelete={this.handleDeleteTask} onChange = {this.handleChange}task = {t} />)
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
        this.state = {value: '', datevalue:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        
        //To create a task object
        event.preventDefault();
        
        const task = {id:Date.now(), name: this.state.value, 
        date: new Date(),    
        dueDate: this.state.datevalue};
        
        //TO add the task object to the task list
        this.props.onAddTask(task);
    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
    }

    handleDateChange(event) {
        this.setState({ datevalue: event.target.value });
    }
  
  
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange}/>
                
                <input type="submit" value="Add Task" />
                
                <input type="date" value={this.state.datevalue}
                    date-format="DD MMMM YYYY" onChange={this.handleDateChange} />

            </form>
        );
    }
}



ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);