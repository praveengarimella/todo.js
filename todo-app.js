function Task(props) {
  return <li>{props.name}, {new Date().toLocaleDateString()}</li>
}

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: props.list };

    this.handleAddTask = this.handleAddTask.bind(this);

  }


  handleAddTask(task) {
    this.state.list.push(task);
    this.setState({ list: this.state.list });
  }

  render() {

    return (
      <div>
        <h1>TO DO List</h1>
        <ol>{
          this.listItems = this.props.list.map((t) =>
            <Task key={t.id} name={t.name} />
          )}
        </ol>
        <Form onAddTask={this.handleAddTask} />

      </div>

    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const tasksListItems = this.props.tasksListItems;
    event.preventDefault();
    const task = { id: Date.now(), name: this.state.value, dueDate: new Date() };
    this.props.onAddTask(task);


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Add Task" />

      </form>

    );
  }

}


ReactDOM.render(<ToDo list={[]} />, document.getElementById('todo'));