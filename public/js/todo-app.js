class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: props.list };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleAddTask(task) {
    console.log("add task clicked");
    this.state.list.push(task);
    this.setState({ list: this.state.list });
  }
  deleteTask = (e) => {
    const index = parseInt(e.target.dataset.index);

    this.setState((state) => {
      const list = this.state.list.filter((t) => {
        return t.id !== index;
      });
      console.log(list);

      return { list };
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((t) => (
            <li key={t.id} className="task">
              <div>
                {" "}
                <p>
                  {t.name} is due on {t.dueDate}
                </p>
                <button data-index={t.id} onClick={this.deleteTask}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <TaskNameForm onAddTask={this.handleAddTask} />
      </div>
    );
  }
}

class TaskNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", dueDate: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const taskList = this.props.taskList;
    // create a task object
    event.preventDefault();
    const task = {
      id: Date.now(),
      name: this.state.name,
      dueDate: this.state.dueDate,
    };

    // add the task object to the task list
    this.props.onAddTask(task);
    document.getElementById("name").innerText = "";
  }

  handleChange(event) {
    // code to set the state of the component
    this.setState({
      name: event.target.value,
    });
    event.target.value = "";
  }
  handleDate = (e) => {
    this.setState({
      dueDate: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="name"
          value={this.state.name}
          onChange={this.handleChange}
          maxlength="40"
          required
        />
        <input
          type="date"
          id="dueDate"
          value={this.state.value}
          onChange={this.handleDate}
          required
        />

        <input type="submit" value="Add Task" />
      </form>
    );
  }
}

ReactDOM.render(<TodoList list={[]} />, document.getElementById("todo"));
