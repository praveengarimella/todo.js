import { StyleSheet, Text, View, Form, Button,Input,List, ListItem, ListView, TextInput, YellowBox } from "react-native";
import React from "react";
import {Card} from "react-native-elements";
// import DatePicker from 'react-native-datepicker';


    function Task(props) {

        // console.log(props)
        if(props.isDone==true){                
            console.log("Entered isDone")
            return ( <View>
                      {/* <Card containerStyle={{ backgroundColor: "#66D19F"}}>
                      </Card> */}

                      <Text>{props.name} {props.dueDate}</Text>
                      {props.delete} 
                    </View>
                    
                    );
            

        }else{
            console.log(props);
            return  (<View>
                        {/* <Card containerStyle={{ backgroundColor: "#B9B99B"}}>
                        </Card> */}

                        <Text>{props.name} {props.dueDate} </Text>
                        {props.delete}
                        {props.mark}


                  </View>
                  );
        }
        
    }
    
    export default class TodoList extends React.Component {
        constructor(props) {
            super(props);
            this.state = { list: props.list };
    
            this.handleAddTask = this.handleAddTask.bind(this);
            this.handleDeleteTask = this.handleDeleteTask.bind(this);
            this.handleMarkTask = this.handleMarkTask.bind(this);
        }
        handleAddTask(task) {
            console.log("add task clicked");
            this.setState({ list:[...this.state.list,task] })
            console.log("Task added :",this.state.list);
        }
    
        handleDeleteTask(id) {
            console.log(id);
            this.list = this.state.list.filter((t) => {
                if(t.id != id) {
                    return t;
                }
            })
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
            this.setState({list: this.list})
            console.log("hai-mark")
        
        }
        render() {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.list.map((t) => 
                        <Task key={t.id} name={t.name} dueDate={t.dueDate} delete={t.delete} mark={t.mark} isDone={t.isDone}/>)}    
                        <TaskNameForm onAddTask={this.handleAddTask} onDeleteTask={this.handleDeleteTask} onMarkTask={this.handleMarkTask}/>
                </View>
                
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
           
            event.preventDefault();
            const id = Date.now();
            console.log("id",id);
            const task = { id: id, name: this.state.value, 
                           dueDate:this.state.dueDate, 
                           isDone:false,
                           delete: <Button onPress={() => this.deleteTask(id)} title="delete" color="#009933" />,
                           mark:<Button onPress= {() => this.markTask(id)} title="mark" color="#009933"/>};
            console.log(task);
            this.props.onAddTask(task);
            this.setState({value:""});
            this.setState({dueDate:""});
    
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
            this.setState({ value: event.target.value });
        }
        handleDate(event){
            this.setState({dueDate:event.target.value});
        }
        render() {
            console.log("render")
            return (
                <View>
                    <TextInput style={{backgroundColor :  "white" }}type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter Task Name :" />
                    <TextInput style={{backgroundColor :  "white" }}type="date" value={this.state.dueDate} onChange={this.handleDate} placeholder="Enter Due Date :" />
                    <Button title = "Add Task" onPress={this.handleSubmit} color="#009933"  />
                </View>
                    
            );
        }
    }
    
    
