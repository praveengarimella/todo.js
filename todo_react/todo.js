function Task(props) {
    return <li>{props.name}, {props.dueDate.toLocaleTimeString()}, {props.delete}</li>
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
        // this.state.list.push(task);
        this.state.list.push(task);
        this.setState({ list: this.state.list })
    }

    handleDeleteTask(id) {
        console.log(id);
        this.list = this.state.list.filter((t) => {
            if(t.id != id) {
                return t;
            }
        })
        // console.log(this.list)
        this.setState({list: this.list})
    }
    render() {
        console.log("hai")
        return (
            <div>
                <h1> TODO List</h1>
                <ol>
                    {
                        this.state.list.map((t) => <Task key={t.id} name={t.name} dueDate={t.dueDate} delete={t.delete} />)
                    }
                </ol>
                <TaskNameForm onAddTask={this.handleAddTask} onDeleteTask={this.handleDeleteTask} />

            </div>
        );
    }
}

class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(event) {
        // const taskList = this.props.taskList;
        //code to add task
        // console.log("add a task")
        event.preventDefault();
        const id = Date.now();
        console.log(id);
        const task = { id: id, name: this.state.value, dueDate: new Date, delete: <button onClick={() => this.deleteTask(id)}>Delete</button> };
        // tasks.push(task);
        this.props.onAddTask(task);

    }

    deleteTask(id) {
        console.log("Delete clicked")
        this.props.onDeleteTask(id);
    }
    handleChange(event) {
        //code to set the statae of the component
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                
                <input type="date" value="date" id="date"/>
                
                <input type="submit" value="Add Task" />
            </form>
        );
    }
}


ReactDOM.render(
    <TodoList list={[]} />, document.getElementById('todo')
);