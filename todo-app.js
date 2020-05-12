function Task(props) {
  return <li>{props.name}, {new Date().toDateString()}</li>
}

class ToDo extends React.Component {
  render() {
    return (
      <div>
        <h1>TO DO List</h1>
        <ol>
          <Task name="Welcome Task" />
        </ol>
      </div>

    );
  }
}

ReactDOM.render(<ToDo />, document.getElementById('todo'));