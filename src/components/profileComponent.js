import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import {buttonColor, linkColor, secondaryColor} from '../../assets/colors';
import {textInputChangeFunc, checkFieldsValidity} from './../commons/fieldsValidation';
import Toolbar from './toolbarComponent';
import auth from '@react-native-firebase/auth';
import validation from './../../utils/errorMessages';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = ({ route, navigation }) => {

    const { screenName } = route.params;
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [editableField, onChangeEditaleField] = useState(false);
    const [editEnabled, onChangeEditEnabled] = useState(false);

    const [emptyEmailField, onChangeEmptyEmailField] = useState(false);
    const [emptyNameField, onChangeEmptyNameField] = useState(false);
    const [invalidEmailField, onInvalidEmailField] = useState(false);
    const [wrongEmailField, onWrongEmailField] = useState(false);

    const [loadingActivity, setLoadingActivity] = useState(true);

    let emailTextInput, nameTextInput;

    const getData = async () => {
        try {
          const name = await AsyncStorage.getItem('@name');
          onChangeName(name);
          const email = await AsyncStorage.getItem('@email');
          onChangeEmail(email);
          setLoadingActivity(false);
          if(value !== null) {
            // value previously stored
          }
        } catch(e) {
          // error reading value
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const editDisabled = () => {
        onChangeEditaleField(false);
        onChangeEditEnabled(false);
    };

    const editProfileCallBack = () => {
        onChangeEditaleField(true);
        onChangeEditEnabled(true);
    };

    const clearErrors = () => {
        onWrongEmailField(false);
        onInvalidEmailField(false);
        onInvalidPassField(false);
        onUnknownUser(false);
    };

    const fieldValueChangeFunc = (text, titleTextInput, type) => {
        if(type === 'name') {
            onChangeEmptyNameField(textInputChangeFunc(text, titleTextInput));
            onChangeName(text);
        } else if(type === 'email') {
            clearErrors();
            onChangeEmptyEmailField(textInputChangeFunc(text, titleTextInput));
            onChangeEmail(text);
        } else if(type === 'password') {
            clearErrors();
            onChangeEmptyPasswordField(textInputChangeFunc(text, titleTextInput));
            onChangePassword(text);
        }
    };

    // const getData = async () => {
    //     clearErrors();
    //     setLoadingText(true);
    //     const fields = [
    //         {
    //             value: name,
    //             reference: nameTextInput
    //         },
    //         {
    //             value: email,
    //             reference: emailTextInput
    //         },
    //         {
    //             value: password,
    //             reference: passwordTextInput
    //         }
    //     ];
    //     if(checkFieldsValidity(fields)) {
    //         auth()
    //         .signInWithEmailAndPassword(email, password)
    //         .then(() => {
    //             console.log('User account signed in!');
    //             // add params including screen name
    //             navigation.navigate('ToDoList', {
    //                 screenName: 'ToDoList'
    //             });
    //             setLoadingText(false);
    //         })
    //         .catch(error => {
    //             if (error.code === 'auth/wrong-password') {
    //                 console.log('The password is invalid or the user does not have a password.');
    //                 onInvalidPassField(true);
    //             }

    //             if (error.code === 'auth/invalid-email') {
    //                 console.log('That email address is invalid!');
    //                 onInvalidEmailField(true);
    //             }

    //             if (error.code === 'auth/user-not-found') {
    //                 console.log('There is no user record corresponding to this identifier.');
    //                 onWrongEmailField(true);
    //             }

    //             if (error.code === 'auth/unknown') {
    //                 console.log('Too many unsuccessful login attempts. Please try again later.');
    //                 onUnknownUser(true);
    //             }

    //             setLoadingText(false);
    //             console.error(error);
    //         });
    //     } else {
    //         setLoadingText(false);
    //     }
    // }

  return (
    <View style={ styles.mainContainer }>
        <Toolbar title='ReminderApp' 
            navigation={navigation} 
            screenName={screenName} 
            editProfileCallBack={editProfileCallBack} 
            editEnabled={editEnabled}
            editDisabled={editDisabled} 
        />

        {
          (loadingActivity) && (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color={secondaryColor} />
            </View>
          )
        }

        {
          (!loadingActivity) && (
            <View style={ styles.profileContainer }>

            <TextInput
                style={ styles.textInput }
                onChangeText={text => fieldValueChangeFunc(text, nameTextInput, 'name')}
                value={name}
                placeholder='Full Name'
                textContentType='name'
                editable={editableField}
                ref={r=>nameTextInput=r}
            />
            {emptyNameField && <Text style={ styles.errorMessage }>{validation.textFields.empty.message}</Text>}

            <TextInput
                style={ styles.textInput }
                onChangeText={text => fieldValueChangeFunc(text, emailTextInput, 'email')}
                value={email}
                placeholder='Email'
                textContentType='emailAddress'
                editable={editableField}
                ref={r=>emailTextInput=r}
            />
            {emptyEmailField && <Text style={ styles.errorMessage }>{validation.email.empty.message}</Text>}
            {invalidEmailField && <Text style={ styles.errorMessage }>{validation.email.incorrect.message}</Text>}
            {wrongEmailField && <Text style={ styles.errorMessage }>{validation.email.wrong.message}</Text>}

            </View>
          )
        }

    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center'
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
        marginVertical: 10,
        color: 'black'
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

export default Profile;