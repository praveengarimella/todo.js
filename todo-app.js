function Task(props) {
    return <li>{props.name},
    
        <strong>Created on: </strong> {new Date().getMonth()}/{new Date().getDate()},
        <strong>Due Date:</strong> {props.dueDate}
        <input type="checkbox" />
        <button onClick={() => { props.deleteTask(props.id) }}>Delete</button>
    </li>
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: props.list };

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
    }

    handleAddTask(task) {
        console.log("add task clicked");
        this.state.list.push(task);
        this.setState({ list: this.state.list });
    }

    handleDeleteTask(taskId) {
        let updatedList = this.state.list.filter(t => t.id !== taskId);
        this.setState({ list: updatedList });
    }


    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) =>
                            <Task key={t.id} id={t.id} name={t.name} dueDate={t.dueDate} Date={t.date} deleteTask={this.handleDeleteTask} />
                    )}
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask} />
            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: '',datevalue: 'No duedate'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

  

    handleChange(event) {
        // code to set the state of the component
        this.setState({ value: event.target.value });
    }

    handleDateChange(event) {
        this.setState({ datevalue: event.target.value });
    }

    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const task = {id: Date.now(), name: this.state.value,
        date: new Date(),
        dueDate: this.state.datevalue};
        // add the task object to the task list
        this.props.onAddTask(task);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange}/>

            <input type="date"
            value={this.state.datevalue}
            date-format = "DD MMMM YYYY"
            onChange={this.handleDateChange} />

            <input type="submit" value="AddTask" />
            </form>
        );
    }
}

ReactDOM.render(<TodoList list={[]} />, document.getElementById('todo'));