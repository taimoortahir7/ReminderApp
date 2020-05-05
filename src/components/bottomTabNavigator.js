import React from 'react';
import ToDoList from './listComponent';
import Profile from './profileComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {buttonColor} from '../../assets/colors';
import FontistoIcons from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='ToDoList' backBehavior='initialRoute' tabBarOptions={{
            activeTintColor: buttonColor,
            showLabel: false
        }}>
            <Tab.Screen name="ToDoList" component={ToDoList} initialParams={ {screenName: 'ToDoList'} } options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <FontistoIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Profile" component={Profile} initialParams={ {screenName: 'Profile'} } options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <FontistoIcons name="person" color={color} size={size} />
                ),
            }}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;