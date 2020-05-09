class TodoApp extends React.Component {
    state = {
      tasks: ['Welcome task', 'Task 1', 'Task 2']
    };
  
    handleSubmit = task => {
      this.setState({tasks: [...this.state.tasks, task]});
    }
    
    handleDelete = (index) => {
      const newArr = [...this.state.tasks];
      newArr.splice(index, 1);
      this.setState({tasks: newArr});
    }
  
    render() {
      return(
          <div style={{minHeight: "100vh", display: "flex", 
                        justifyContent: "center"}}>
            <div style={{color: "blue"}}>
                <h2>To_Do</h2>
                <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
                <TaskForm onFormSubmit={this.handleSubmit} />
            </div>
        </div>
      );
    }
  }
  
  
  class TaskForm extends React.Component {
    state = { term: '' };
  
    handleSubmit = (event) => {
      event.preventDefault();
      if(this.state.term === '') return;
      this.props.onFormSubmit(this.state.term);
      this.setState({ term: '' });
    }
  
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <input style={{marginRight: "10px"}}
            type='text'
            placeholder='Write your tasks here'
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value})}
          />
          <button>Add task</button>
        </form>
      );
    }
  }
  
  
  const TodoList = (props) => {
    const todos = props.tasks.map((todo, index) => {
      return <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    })
    return( 
        <div style={{maxHeight: "200px"}}>
            {todos}
        </div>
    );
  }
  
  const Todo = (props) => {
    return(
        <div>
            <li>
                {props.content}
                <button style={{marginLeft: "15px"}} onClick={() =>
                    {props.onDelete(props.id)}}>
                        Delete task
                </button>
            </li>
        </div>
    );
  }
  
  ReactDOM.render(
    <TodoApp />,
    document.querySelector('#todo')
  );
