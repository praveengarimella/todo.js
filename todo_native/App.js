import React from 'react';
import { Dimensions,StyleSheet, Text, View } from 'react-native';
import {Header} from 'native-base';
import TodoList from "./containers/todo_app"

export default function App() {
  return (
    <View style={styles.container}>
      <Header style={{height:70 ,backgroundColor:'#D1AB3E', paddingTop:15, width:Dimensions.get('window').width}}><Text style={{color:'aquablue',fontSize:25}}>TODO</Text></Header>
      <TodoList list={[]}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004BA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

