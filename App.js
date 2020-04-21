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
import {secondaryColor} from './assets/colors';
import AddTask from './src/components/addTaskComponent';

const App: () => React$Node = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {
            backgroundColor: secondaryColor,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false
        }}
      >
        <Stack.Screen name='ToDoList' component={ToDoList}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='AddTask' component={AddTask}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
