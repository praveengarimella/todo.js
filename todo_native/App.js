import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TodoList from "./containers/todo_app"
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Todo</Text>
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
