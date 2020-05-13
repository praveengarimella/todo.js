

    function Task(props) {

        // console.log(props)
        if(props.isDone===true){
            return <li><h4><p>{props.name} {props.dueDate} {props.delete} {props.mark}</p></h4></li>
        }else{
            return <li><h4>{props.name} {props.dueDate} {props.delete} {props.mark}</h4></li>

        }
        
    }
    
    class TodoList extends React.Component {
        constructor(props) {
            super(props);
            this.state = { list: props.list };
    
            this.handleAddTask = this.handleAddTask.bind(this);
            this.handleDeleteTask = this.handleDeleteTask.bind(this);
            this.handleMarkTask = this.handleMarkTask.bind(this);
        }
        handleAddTask(task) {
            console.log("add task clicked");
            // this.state.list.push(task);
            this.setState({ list:[...this.state.list,task] })
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
        handleMarkTask(id){
            console.log("MarkTask",id);
            this.list = this.state.list.filter((t) => {
                if(t.id == id) {
                    t.isDone = true;
                }
                return t;
            })
            // console.log(this.list)
            this.setState({list: this.list})
            console.log("hai")
        
        }

        render() {
            return (
                <div>
                    <h1> TODO List</h1>
                    <ol>
                        {
                            this.state.list.map((t) => <Task key={t.id} name={t.name} dueDate={t.dueDate} isDone={t.isDone} delete={t.delete} mark={t.mark} />)
                        }
                    </ol>
                    <TaskNameForm onAddTask={this.handleAddTask} onDeleteTask={this.handleDeleteTask} onMarkTask={this.handleMarkTask}/>
    
                </div>
            );
        }
    }
    
    class TaskNameForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = { value: "" ,dueDate:"" ,isDone:false};
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleDate   = this.handleDate.bind(this);
    
        }
        handleSubmit(event) {
            const taskList = this.props.taskList;
            //code to add task
            // console.log("add a task")
            event.preventDefault();
            const id = Date.now();
            console.log(id);
            console.log("dueDate",this.state.dueDate);
            const task = { id: id, name: this.state.value, 
                           dueDate:this.state.dueDate, 
                           isDone:false,
                           delete: <button onClick={() => this.deleteTask(id)}>Delete</button>,
                           mark:<button onClick= {() => this.markTask(id)}>Mark</button>};
            // tasks.push(task);
            console.log(task);
            this.props.onAddTask(task);
            // to clear the input name field once submitted
            this.state.value=""
            // to clear the input Date field once submitted
            this.state.dueDate=""
    
        }
    
        markTask(id){
            console.log("MarkTask clicked")
            this.props.onMarkTask(id);
        }

        deleteTask(id) {
            console.log("Delete clicked")
            this.props.onDeleteTask(id);
        }

        handleChange(event) {
            //code to set the statae of the component
            this.setState({ value: event.target.value });
        }
        handleDate(event){
            this.setState({dueDate:event.target.value});
        }
        render() {
            console.log("hao")
            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    
                    <input type="date" value={this.state.dueDate} onChange={this.handleDate} id="date"/>
                    
                    <input type="submit" value="Add Task" />
                </form>
            );
        }
    }
    
    
    ReactDOM.render(
        <TodoList list={[]} />, document.getElementById('todo')
    );
