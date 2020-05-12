function Task(props) {
  return <li>{props.name}, <b>Due Date:</b> {new Date().toDateString()}</li>
}

class ToDo extends React.Component {

  render() {
    const listItems = this.props.list.map((t) =>
      <Task name={t.name} />
    );
    return (
      <div>
        <h1>TO DO List</h1>
        <ol>
          {listItems}
        </ol>
      </div>

    );
  }
}

const tasksList = [{ name: "Welcome Task" }, { name: "Complete Todo in ReactJS" }]

ReactDOM.render(<ToDo list={tasksList} />, document.getElementById('todo'));