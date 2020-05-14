import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newTask: "", list: [] };
  }

  addTask(todoValue) {
    if (todoValue !== "") {
      const newTask = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list];
      list.push(newTask);

      this.setState({
        list,
        newTask: ""
      });
    }
  }

  deleteTask(id) {
    const list = [...this.state.list];
    const updatedlist = list.filter(item => item.id !== id);
    this.setState({ list: updatedlist });
  }

  updateInput(input) {
    this.setState({ newTask: input });
  }

  render() {
    return (
      <div>

        <h1 className="app-title">Todo App</h1>
        <div className="container">
          Add an Item....
          <br/>
          <br/>
          <input
            type="text"
            className="input-text"
            placeholder="Write a Todo"
            required
            value={this.state.newTask}
            onChange={e => this.updateInput(e.target.value)}
          />
          <button
            className="add-btn"
            onClick={() => this.addTask(this.state.newTask)}
            disabled={!this.state.newTask.length}
          > 
            Add Todo
          </button>
          <div className="list">
            <ol>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    <input
                      type="checkbox"
                      name="idDone"
                      checked={item.isDone}
                      onChange={() => { }}
                    />  
                    {item.value}
                    <button
                      className="btn"
                      onClick={() => this.deleteTask(item.id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;