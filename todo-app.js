function Task(props) {
    return <li><input type = "checkbox"/> {props.name}, {props.dueDate.toLocaleTimeString()},{props.dueDate.toLocaleString()} <input type="button" value="Delete" onClick={() => {props.onDeleteTask(props.id)}}/> </li>
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

    handleDeleteTask(id) {
        console.log("delete task clicked");
        let newList = this.state.list.filter(taskDelete => {
            if(taskDelete.id !== id)
                return taskDelete;
        })
        this.setState({list: newList})
    }

    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                    this.state.list.map((t) =>
                        <Task key={t.id} name={t.name} dueDate={t.dueDate} onDeleteTask={this.handleDeleteTask} id = {t.id}/>)
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
        this.handleDate = this.handleDate.bind(this);
    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const task = {id:Date.now(), name: this.state.value, 
        dueDate: new Date()};
        // add the task object to the task list
        this.props.onAddTask(task);
        this.setState({value: ''})
    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
    }

    handleDate(event) {
        this.setState({dueDate: event.target.value});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} > 
                <input type="text" value={this.state.value} 
                onChange={this.handleChange}/>
                <input type="date" value={this.state.dueDate} 
                onChange={this.handleDate} />
                <input type="submit" value="Add Task" />       
            </form>       
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);
