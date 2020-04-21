import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {buttonColor} from '../../assets/colors';

const Placeholder = (props) => {

    const buttonPressed = () => {
        // add params including screen name
        props.navigation.navigate('AddTask', {
            screenName: 'AddTask'
        });
    };

  return (
    <View style={ styles.mainContainer }>
        <Image source={ require('./../../assets/images/list.png') } style={ styles.placeholder }/>
        <Text style={ styles.placeholderText }>Currently there is no pending task</Text>
        <TouchableOpacity style={ styles.placeholderButton } onPress={buttonPressed}>
            <Text style={ styles.buttonText }>Add Task</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    placeholder: {
        width: 100,
        height: 100
    },
    placeholderText: {
        marginVertical: 10
    },
    placeholderButton: {
        alignItems: "center",
        backgroundColor: buttonColor,
        padding: 10,
        width: 200,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: 'white'
    },
});

export default Placeholder;