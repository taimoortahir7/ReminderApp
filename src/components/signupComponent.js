import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {buttonColor, linkColor} from '../../assets/colors';

const Signup = ({ navigation }) => {

    const [name, onChangeName] = useState();
    const [email, onChangeEmail] = useState();
    const [password, onChangePassword] = useState();

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const onChangeConfirmPassword = (text) => {
        
    };

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@email', email);
            await AsyncStorage.setItem('@password', password);
            
        } catch (e) {
            await AsyncStorage.setItem('@error', e);
        }
    }

    const getData = async () => {
        try {
            const emailValue = await AsyncStorage.getItem('@email');
            const passwordValue = await AsyncStorage.getItem('@password');
            if(!emailValue && !passwordValue) {
                await storeData();

                // add params including screen name
                navigation.navigate('ToDoList', {
                    screenName: 'ToDoList'
                });

            } else {
                if(emailValue === email && passwordValue === password) {
                    // add params including screen name
                    navigation.navigate('ToDoList', {
                        screenName: 'ToDoList'
                    });
                }
            }
        } catch(e) {
            console.log('error: ', e);
        }
    }

  return (
    <View style={ styles.mainContainer }>
        <Text style={ styles.appNameText }>Reminder App</Text>
        <TextInput
            style={ styles.textInput }
            onChangeText={text => onChangeName(text)}
            placeholder='Full Name'
            textContentType='name'
        />
        <TextInput
            style={ styles.textInput }
            onChangeText={text => onChangeEmail(text)}
            placeholder='Email'
            textContentType='emailAddress'
        />
        <TextInput
            style={ styles.textInput }
            onChangeText={text => onChangePassword(text)}
            placeholder='Password'
            textContentType='password'
            secureTextEntry={true}
        />
        <TextInput
            style={ styles.textInput }
            onChangeText={text => onChangeConfirmPassword(text)}
            placeholder='Confirm Password'
            textContentType='password'
            secureTextEntry={true}
        />
        <TouchableOpacity style={ styles.placeholderButton } onPress={getData}>
            <Text style={ styles.buttonText }>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={ styles.loginText }>Already have an account? <Text style={ styles.loginLink } onPress={navigateToLogin}>Login</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholder: {
        width: 100,
        height: 100
    },
    appNameText: {
        marginVertical: 10,
        fontSize: 25
    },
    placeholderButton: {
        alignItems: "center",
        backgroundColor: buttonColor,
        padding: 10,
        width: 200,
        borderRadius: 5,
        marginTop: 40
    },
    buttonText: {
        color: 'white'
    },
    textInput: { 
        height: 40, 
        borderColor: buttonColor, 
        borderBottomWidth: 1,
        width: 300,
        marginVertical: 10
    },
    loginText: {
        marginVertical: 15
    },
    loginLink: {
        color: linkColor
    }
});

export default Signup;