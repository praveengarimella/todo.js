import { StyleSheet, Text, View, Form, Button,Input,List, ListItem, ListView, TextInput, YellowBox, ScrollView } from "react-native";
import React from "react";
import {Card} from "react-native-elements";
import DatePicker from 'react-native-datepicker';




    function Task(props) {

        // console.log(props)
        if(props.isDone==true){                
            console.log("Entered isDone")
            return ( <View>
                     <Card containerStyle={{padding: 10, margin :5, backgroundColor: 'green', alignContent: 'center'}}>
                      <Text style={{paddingTop:10 ,margin:10 ,fontSize:25 }}>{props.name} {props.dueDate}</Text> 
                      {props.delete} 
                      </Card>

                    </View>
                    
                    );
            

        }else{
            console.log(props);
            return  (<View>
                        <Card containerStyle={{padding: 10, margin :5,  backgroundColor: 'skyblue', alignContent: 'center'}}>
                        <Text style={{paddingTop:10 ,margin:10 ,fontSize:25,color: 'aquawhite'}}>{props.name} {props.dueDate}</Text>
                        {props.delete} 
                        {props.mark}
                        </Card>
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
            const list1 = this.state.list

            for( var i = 0; i < list1.length; i++){ 
                if ( list1[i].id === id ) { 
                  list1.splice(i, 1); i--; 
                }
              }
              console.log(list1)

            this.setState({list:list1})
        }
        handleMarkTask(id){
            console.log("MarkTask",id);
            const list1 = this.state.list

            for( var i = 0; i < list1.length; i++){ 
                if ( list1[i].id === id ) { 
                  list1[i].isDone = true; 
                }
              }
              console.log(list1)

            this.setState({list:list1})
        
        }
        render() {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView>
                    <TaskNameForm onAddTask={this.handleAddTask} onDeleteTask={this.handleDeleteTask} onMarkTask={this.handleMarkTask}/>

                        <Card containerStyle={{padding: 10, margin :25, backgroundColor: '#D1AB3E', alignContent: 'center'}}>
                        <Text style={{color:'white' ,fontSize:25,paddingTop:30}}>Tasks To Do </Text>
                    {this.state.list.map((t) => 
                        <Task key={t.id} name={t.name} dueDate={t.dueDate} delete={t.delete} mark={t.mark} isDone={t.isDone}/>)}    
                        </Card>

                    </ScrollView>
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
                           delete: <Button  onPress={() => this.deleteTask(id)} title="delete" color="pink" margin="10" />,
                           mark:   <Button  onPress= {() => this.markTask(id)} title="mark" color="purple"/>};
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
            this.setState({ value: event.nativeEvent.text });
        }
        handleDate(event){
            this.setState({dueDate: event.nativeEvent.text});
        }
        render() {
            console.log("render")
            return (
                <View>
                    <Card containerStyle={{padding: 10, margin :30,  backgroundColor: '#D1AB3E', alignContent: 'center'}}>
                    <Text>Task Name :</Text>
                    <TextInput style={{margin:5,padding:5,backgroundColor :  "white" }}type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter Task Name :" />
                    <Text>dueDate :</Text>
                    <DatePicker
                                style={{width: 200}}
                                date={this.state.dueDate} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2016"
                                maxDate="01-01-2019"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                    },
                                    dateInput: {
                                    marginLeft: 36
                                    }
                                }}
                                onDateChange={(dueDate) => {this.setState({dueDate: dueDate})}} />
                    <Button title = "Add Task" onPress={this.handleSubmit} color="#009933"  />
                    </Card>
                    
                </View>
                    
            );
        }
    }

     


