import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {buttonColor, linkColor} from '../../assets/colors';
import {textInputChangeFunc, checkFieldsValidity} from './../commons/fieldsValidation';

const Login = ({ navigation }) => {

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    let emailTextInput, passwordTextInput;
    
    const navigateToSignup = () => {
        navigation.navigate('Signup');
    };

    const fieldValueChangeFunc = (text, titleTextInput, type) => {
        textInputChangeFunc(text, titleTextInput);
        if(type === 'email') {
            onChangeEmail(text);
        } else if(type === 'password') {
            onChangePassword(text);
        }
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
        const fields = [
            {
                value: email,
                reference: emailTextInput
            },
            {
                value: password,
                reference: passwordTextInput
            }
        ];
        if(checkFieldsValidity(fields)) {
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
    }

  return (
    <View style={ styles.mainContainer }>
        <Text style={ styles.appNameText }>Reminder App</Text>
        <TextInput
            style={ styles.textInput }
            onChangeText={text => fieldValueChangeFunc(text, emailTextInput, 'email')}
            placeholder='Email'
            textContentType='emailAddress'
            ref={r=>emailTextInput=r}
        />
        <TextInput
            style={ styles.textInput }
            onChangeText={text => fieldValueChangeFunc(text, passwordTextInput, 'password')}
            placeholder='Password'
            textContentType='password'
            secureTextEntry={true}
            ref={r=>passwordTextInput=r}
        />
        <TouchableOpacity style={ styles.placeholderButton } onPress={getData}>
            <Text style={ styles.buttonText }>LOGIN</Text>
        </TouchableOpacity>
        <Text style={ styles.signupText }>Don't have account? <Text style={ styles.signupLink } onPress={navigateToSignup}>Signup</Text></Text>
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
    signupText: {
        marginVertical: 15
    },
    signupLink: {
        color: linkColor
    }
});

export default Login;