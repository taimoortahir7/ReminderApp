import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {buttonColor, linkColor} from '../../assets/colors';
import {textInputChangeFunc, checkFieldsValidity} from './../commons/fieldsValidation';
import auth from '@react-native-firebase/auth';
import validation from './../../utils/errorMessages';

const Signup = ({ navigation }) => {

    const [name, onChangeName] = useState();
    const [email, onChangeEmail] = useState();
    const [password, onChangePassword] = useState();
    const [ConfPassword, onChangeConfPassword] = useState();

    const [emptyNameField, onChangeEmptyNameField] = useState(false);
    const [emptyEmailField, onChangeEmptyEmailField] = useState(false);
    const [emptyPasswordField, onChangeEmptyPasswordField] = useState(false);
    const [alreadyInUseField, onAlreadyInUseField] = useState(false);
    const [invalidEmailField, onInvalidEmailField] = useState(false);
    const [invalidPassField, onInvalidPassField] = useState(false);
    
    let nameTextInput, emailTextInput, passwordTextInput, CPasswordTextInput;

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const fieldValueChangeFunc = (text, titleTextInput, type) => {
        if(type === 'name') {
            onChangeEmptyNameField(textInputChangeFunc(text, titleTextInput));
            onChangeName(text);
        } else if(type === 'email') {
            onChangeEmptyEmailField(textInputChangeFunc(text, titleTextInput));
            onChangeEmail(text);
        } else if(type === 'password') {
            onChangeEmptyPasswordField(textInputChangeFunc(text, titleTextInput));
            onChangePassword(text);
        } else if(type === 'conf_password') {
            onChangeConfPassword(text);
            // if(password === ConfPassword) {
            //     titleTextInput.setNativeProps({
            //         borderColor: buttonColor,
            //         borderBottomWidth: 1
            //     });
            // } else {
            //     titleTextInput.setNativeProps({
            //         borderColor: 'red',
            //         borderBottomWidth: 1
            //     });
            // }
        }
    };

    const signup = () => {
        const fields = [
            {
                value: name,
                reference: nameTextInput
            },
            {
                value: email,
                reference: emailTextInput
            },
            {
                value: password,
                reference: passwordTextInput
            },
            {
                value: ConfPassword,
                reference: CPasswordTextInput
            }
        ];
        if(checkFieldsValidity(fields)) {
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                // add params including screen name
                navigation.navigate('ToDoList', {
                    screenName: 'ToDoList'
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    onAlreadyInUseField(true);
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    onInvalidEmailField(true);
                }

                if (error.code === 'auth/weak-password') {
                    console.log('Password should be at least 6 characters!');
                    onInvalidPassField(true);
                }

                console.error(error);
            });
        }
    };

  return (
    <View style={ styles.mainContainer }>
        <Text style={ styles.appNameText }>Reminder App</Text>
        <TextInput
            style={ styles.textInput }
            onChangeText={text => fieldValueChangeFunc(text, nameTextInput, 'name')}
            placeholder='Full Name'
            textContentType='name'
            ref={r=>nameTextInput=r}
        />
        {emptyNameField && <Text style={ styles.errorMessage }>{validation.textFields.empty.message}</Text>}

        <TextInput
            style={ styles.textInput }
            onChangeText={text => fieldValueChangeFunc(text, emailTextInput, 'email')}
            placeholder='Email'
            textContentType='emailAddress'
            ref={r=>emailTextInput=r}
        />
        {emptyEmailField && <Text style={ styles.errorMessage }>{validation.email.empty.message}</Text>}
        {alreadyInUseField && <Text style={ styles.errorMessage }>{validation.email.alreadyInUse.message}</Text>}
        {invalidEmailField && <Text style={ styles.errorMessage }>{validation.email.incorrect.message}</Text>}

        <TextInput
            style={ styles.textInput }
            onChangeText={text => fieldValueChangeFunc(text, passwordTextInput, 'password')}
            placeholder='Password'
            textContentType='password'
            secureTextEntry={true}
            ref={r=>passwordTextInput=r}
        />
        {emptyPasswordField && <Text style={ styles.errorMessage }>{validation.password.empty.message}</Text>}
        {invalidPassField && <Text style={ styles.errorMessage }>{validation.password.incorrect.message}</Text>}

        <TextInput
            style={ styles.textInput }
            onChangeText={text => fieldValueChangeFunc(text, CPasswordTextInput, 'conf_password')}
            placeholder='Confirm Password'
            textContentType='password'
            secureTextEntry={true}
            ref={r=>CPasswordTextInput=r}
        />

        <TouchableOpacity style={ styles.placeholderButton } onPress={signup}>
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
    },
    errorMessage: {
        color: 'red'
    }
});

export default Signup;