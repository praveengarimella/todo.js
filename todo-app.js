function Task(props) {
return <li>{props.name}, {new Date().toLocaleTimeString()}</li>
}

class TodoList extends React.Component {
    render() {
        return (
            <div>
                <h1>TODO List</h1>
                <ol>
                    <Task name="Welcome Task" />
                </ol>
            </div>
        );
    }
}

const tasks = [{name: "Welcome Task"}, {name: "first task"}];
ReactDOM.render(
    <TodoList list={tasks}/>,
    document.getElementById('todo')
);