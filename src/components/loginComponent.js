import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import {buttonColor, linkColor, secondaryColor} from '../../assets/colors';
import {textInputChangeFunc, checkFieldsValidity} from './../commons/fieldsValidation';
import auth from '@react-native-firebase/auth';
import validation from './../../utils/errorMessages';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({ navigation }) => {

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const [emptyEmailField, onChangeEmptyEmailField] = useState(false);
    const [emptyPasswordField, onChangeEmptyPasswordField] = useState(false);
    const [invalidEmailField, onInvalidEmailField] = useState(false);
    const [wrongEmailField, onWrongEmailField] = useState(false);
    const [invalidPassField, onInvalidPassField] = useState(false);
    const [unknownUser, onUnknownUser] = useState(false);

    const [loadingText, setLoadingText] = useState(false);

    let emailTextInput, passwordTextInput;
    
    const navigateToSignup = () => {
        navigation.navigate('Signup');
    };

    const storeData = async (identity) => {
        try {
          await AsyncStorage.setItem('@name', identity.user._user.displayName);
          await AsyncStorage.setItem('@email', identity.user._user.email);
        } catch (e) {
          // saving error
        }
    };

    const clearErrors = () => {
        onWrongEmailField(false);
        onInvalidEmailField(false);
        onInvalidPassField(false);
        onUnknownUser(false);
    };

    const fieldValueChangeFunc = (text, titleTextInput, type) => {
        if(type === 'email') {
            clearErrors();
            onChangeEmptyEmailField(textInputChangeFunc(text, titleTextInput));
            onChangeEmail(text);
        } else if(type === 'password') {
            clearErrors();
            onChangeEmptyPasswordField(textInputChangeFunc(text, titleTextInput));
            onChangePassword(text);
        }
    };

    const getData = async () => {
        clearErrors();
        setLoadingText(true);
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
            auth()
            .signInWithEmailAndPassword(email, password)
            .then((identity) => {
                console.log('User account signed in!');
                storeData(identity);
                // add params including screen name
                navigation.navigate('bottomNavigation');
                setLoadingText(false);
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    console.log('The password is invalid or the user does not have a password.');
                    onInvalidPassField(true);
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    onInvalidEmailField(true);
                }

                if (error.code === 'auth/user-not-found') {
                    console.log('There is no user record corresponding to this identifier.');
                    onWrongEmailField(true);
                }

                if (error.code === 'auth/unknown') {
                    console.log('Too many unsuccessful login attempts. Please try again later.');
                    onUnknownUser(true);
                }

                setLoadingText(false);
                console.error(error);
            });
        } else {
            setLoadingText(false);
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
        {emptyEmailField && <Text style={ styles.errorMessage }>{validation.email.empty.message}</Text>}
        {invalidEmailField && <Text style={ styles.errorMessage }>{validation.email.incorrect.message}</Text>}
        {wrongEmailField && <Text style={ styles.errorMessage }>{validation.email.wrong.message}</Text>}

        <TextInput
            style={ styles.textInput }
            onChangeText={text => fieldValueChangeFunc(text, passwordTextInput, 'password')}
            placeholder='Password'
            textContentType='password'
            secureTextEntry={true}
            ref={r=>passwordTextInput=r}
        />
        {emptyPasswordField && <Text style={ styles.errorMessage }>{validation.password.empty.message}</Text>}
        {invalidPassField && <Text style={ styles.errorMessage }>{validation.password.wrong.message}</Text>}
        {unknownUser && <Text style={ styles.errorMessage }>{validation.password.unknown.message}</Text>}

        <TouchableOpacity style={ styles.placeholderButton } onPress={getData}>
            {
                !loadingText && (
                    <Text style={ styles.buttonText }>LOGIN</Text>
                )
            }
            {
                loadingText && (
                <View style={ styles.loadingState }>
                    <Text style={ styles.buttonText }>LOGGING IN...</Text>
                    <ActivityIndicator size="small" color='white' />
                </View>
                )
            }
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
    },
    errorMessage: {
        color: 'red'
    },
    loadingState: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

export default Login;