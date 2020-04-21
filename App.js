/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import ToDoList from './src/components/listComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/loginComponent';
import AddTask from './src/components/addTaskComponent';
import Signup from './src/components/signupComponent';

const App: () => React$Node = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Signup'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='ToDoList' component={ToDoList}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='AddTask' component={AddTask}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
