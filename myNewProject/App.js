import React from 'react'
import { View, Button, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Switch, TouchableHighlight } from 'react-native'
import DatePicker from 'react-native-datepicker'
import Constants from 'expo-constants';

function Task(props) {
  return (
    (<View style={styles.todoContainer}>
      <Switch
        value={props.t.complete}
        onValueChange={props.toggleComplete}
      />
      <Text
        style={{
          textDecorationLine: props.t.complete ? 'line-through' : "none",
          textDecorationStyle: 'solid',
          fontSize: 20,
          paddingTop: 4,
        }}
      >
        {" "}{" "}{" "}{" "}
        {props.t.name}
        {" "}{" "}{" "}{" "}
        {props.dueDate}
        {" "}{" "}{" "}{" "}
      </Text>
      <Button title='Delete' color="red" onPress={() => { props.onDelete(props.id) }} />
    </View>)
  )
}

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isStrikThrough: false
    };
  }

  handleDeleteTask = (id) => {
    let list = this.state.list
    list = list.filter(task => task.id != id)
    this.setState({ list: list })
  }

  handleAddTask = (task) => {
    this.state.list.push(task);
    this.setState({ list: this.state.list })
  }

  toggleComplete = (id) => {
    this.setState({
      list: this.state.list.map(task => {
        if (task.id === id) {
          return {
            ...task,
            complete: !task.complete
          }
        } else {
          return task
        }
      })
    })
  }

  render() {
    return (
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <Text style={{ textAlign: 'center', fontSize: 50 }}>ToDo List</Text>
        <TaskNameForm onAddTask={this.handleAddTask} />
        <ScrollView>
          {
            this.state.list.map((t) =>
              <Task
                key={t.id}
                id={t.id}
                t={t}
                dueDate={t.dueDate}
                toggleComplete={() => this.toggleComplete(t.id)}
                onDelete={this.handleDeleteTask}
              />)
          }
        </ScrollView>
      </View>
    );
  }
}

class TaskNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      date: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const task = {
      id: Date.now(), name: this.state.value,
      dueDate: this.state.date, complete: false
    };
    this.props.onAddTask(task);
    this.setState({
      value: "",
      date: ""
    })
  }

  handleChange = (text) => {
    this.setState({ value: text });
  }

  handleDateChange = (date) => {
    this.setState({ date: date })
  }

  render() {
    return (
      <View style={{ padding: 15 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={this.handleChange}
          placeholder='Enter your task...'
          placeholderTextColor='black'
          value={this.state.value}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <DatePicker
            style={{ width: 200 }}
            minDate={new Date()}
            format="MMMM D, YYYY"
            date={this.state.date}
            placeholder='Select Due Date'
            duration={10}
            onDateChange={this.handleDateChange}
            customStyles={{
              placeholderText: {
                fontSize: 15,
                color: '#234456'
              }
            }}
          />
          <TouchableHighlight
            style={{ backgroundColor: 'grey', width: 100, height: 40, alignItems: 'center', padding: 10 }}
            onPress={this.handleSubmit}>
            <Text style={{ fontSize: 20 }}>Add Task</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
  },
  addTaskButton: {
    color: "red"
  },
  todoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1
  },
})