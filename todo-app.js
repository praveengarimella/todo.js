function Task(props) {

  return <li>{props.name},
    <strong>Created on:</strong> {new Date().getMonth()}/{new Date().getDate()},
    <strong>Due date:</strong> {props.dueDate}
    <input type="checkbox" />
    <button onClick={() => { props.deleteTask(props.id) }}>Delete Task</button>
  </li>
}




class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: props.list };

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

  }

  handleDeleteTask(taskId) {
    console.log(taskId);
    let updatedList = this.state.list.filter(t => t.id !== taskId);
    console.log(updatedList);
    this.setState({ list: updatedList });

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
          this.state.list.map((t) =>
            <Task key={t.id}
              id={t.id}
              name={t.name}
              dueDate={t.dueDate}
              Date={t.date}
              deleteTask={this.handleDeleteTask} />,
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
    this.state = {
      value: '',
      datevalue: 'No duedate'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleDateChange(event) {
    this.setState({ datevalue: event.target.value });

  }

  handleSubmit(event) {
    const tasksListItems = this.props.tasksListItems;
    // const date = new Date()
    event.preventDefault();
    const task = {
      id: Date.now(),
      name: this.state.value,
      date: new Date(),
      dueDate: this.state.datevalue
    };
    this.props.onAddTask(task);


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange} />

        <input
          type="date"
          value={this.state.datevalue}
          date-format="DD MMMM YYYY"
          onChange={this.handleDateChange} />

        <input
          type="submit"
          value="AddTask" />

      </form>

    );
  }

}


ReactDOM.render(<ToDo list={[]} />, document.getElementById('todo'));