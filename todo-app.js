function Task(props) {
return <li>{props.name}, {props.dueDate.toLocaleTimeString()} , {props.datevalue} <input type="checkbox" /><button onClick={() => {props.deletemethod(props.id) }}>Delete Task</button></li>
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
    handleDeleteTask(task) {
        console.log("delete task clicked");
        console.log(task);
        let filteredArray = this.state.list.filter(item => item.id !== task)
        this.setState({list: filteredArray});
    }
    
    render() {
        
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} name={t.name} dueDate={t.dueDate} id={t.id} datevalue={t.datevalue} deletemethod = {this.handleDeleteTask}/>)
                    }
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask}/>
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const task = {id:Date.now(), name: this.state.value, 
        dueDate: new Date(), datevalue: this.state.datevalue};
        // add the task object to the task list
        this.props.onAddTask(task);
        this.setState({value: ''});
        // this.setState({datevalue:""})
    }
    
    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
    }
    handleDateChange(event) {
        // code to set the state of the component
        this.setState({datevalue: event.target.value});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange} placeholder = "Enter task.."/>
                <input type="date" date-format="DD MMMM YYYY" value={this.state.datevalue} onChange={this.handleDateChange}></input>
                {/* console.log(datevalue) */}
                <input type="submit" value="Add Task"  />
            </form>
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);