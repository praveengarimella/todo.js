function Task(props) {
    return <li><input type = "checkbox"/> {props.name}, {props.dueDate.toLocaleTimeString()},{props.dateChange} <input type="button" value="Del" onClick={() => {props.DelTask(props.id)}}/> </li>
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
        console.log("Delete task");
        let nList = this.state.list.filter(taskDelete => {
            if (taskDelete.id != id)
                return taskDelete;
        })
        this.setState({list: nList})
    }
    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} name={t.name} dueDate={t.dueDate} dChange={t.dateChange} DelTask={this.handleDeleteTask} id={t.id} />)
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
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(event) {
        this.setState({dChange: event.target.value});
    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const task = {id:Date.now(), name: this.state.value, 
        dueDate: new Date(), dChange: this.state.dChange};
        // add the task object to the task list
        this.props.onAddTask(task);
        this.setState({value: ''})
    }

    handleChange(event) {
        // code to set the state of the component
        this.setState({value: event.target.value});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange}/>
                <input type="date" value={this.state.dChange}
                onChange={this.handleDateChange} />
                <input type="submit" value="Add Task" />
            </form>
        );
    }
}

ReactDOM.render(
    <TodoList list={[]} />,
    document.getElementById('todo')
);