import React, { useState } from 'react';
import database from '@react-native-firebase/database';
import { View, TextInput, Text, ToastAndroid, Platform, AlertIOS, StyleSheet } from 'react-native';
import {Picker} from '@react-native-community/picker';
import {buttonColor, secondaryColor} from '../../assets/colors';
import Toolbar from './toolbarComponent';
import DateTimeComponent from './dateTimeComponent';
import moment from "moment";

const AddTask = ({ route, navigation }) => {

    const { screenName } = route.params;
    const { item } = route.params || undefined;

    const [title, onChangeTitle] = useState(item?.title || '');
    const [description, onChangeDescription] = useState(item?.description || '');
    const [date, setDate] = useState(item?.date || moment(new Date()).format("DD-MM-YYYY"));
    const [time, setTime] = useState(item?.time || moment(new Date()).format("hh:mm:ss"));
    const [taskType, setTaskType] = useState(item?.taskType || "exersice");

    const dateTimeRenderer = (value, mode) => {
        if(mode === 'date') {
            setDate(value);
        } else if(mode === 'time') {
            setTime(value);
        }
    };

    const saveData = () => {
        const newReference = database().ref('Task').push();

        newReference.set({
            title: title,
            description: description,
            date: date,
            time: time,
            taskType: taskType
        })
        .then(() => {
            console.log('Data Set!');
            notifyMessage('Task added successfully !');
            navigation.goBack();
        });
    };

    const editData = () => {

        database()
        .ref('Task/' + item?.key)
        .update({
            title: title,
            description: description,
            date: date,
            time: time,
            taskType: taskType
        })
        .then(() => {
            console.log('Data Set!');
            notifyMessage('Task updated successfully !');
            navigation.goBack();
        });
    };

    const notifyMessage = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
        }
    }

  return (
    <View style={ styles.mainContainer }>
        <Toolbar title='ReminderApp' subTitle='List of Tasks' navigation={navigation} screenName={screenName} addTaskCallback={saveData} editTaskCallback={editData}/>

        <View style={ styles.innerContainer }>
            <TextInput
                style={ styles.textInput }
                onChangeText={text => onChangeTitle(text)}
                placeholder='Title'
                textContentType='jobTitle'
                maxLength={20}
                defaultValue={item?.title || undefined}
            />

            <DateTimeComponent dateTimeCallBack={dateTimeRenderer} date={item?.date || undefined} time={item?.time || undefined}/>

            <View style={ styles.typePickerContainer }>
                <Text>Select Task Type: </Text>
                <Picker
                    selectedValue={taskType}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setTaskType(itemValue)}
                >
                    <Picker.Item label="Exersice" value="exersice" />
                    <Picker.Item label="Prayer" value="prayer" />
                    <Picker.Item label="Study" value="study" />
                    <Picker.Item label="Gaming" value="gaming" />
                    <Picker.Item label="Enjoy" value="enjoy" />
                </Picker>
            </View>

            <TextInput
                style={ styles.textInput }
                onChangeText={text => onChangeDescription(text)}
                placeholder='One line description'
                textContentType='jobTitle'
                maxLength={50}
                defaultValue={item?.description || undefined}
            />
  
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    appNameText: {
        marginVertical: 10,
        fontSize: 25
    },
    placeholderButton: {
        alignItems: "center",
        backgroundColor: buttonColor,
        padding: 10,
        width: 130,
        borderRadius: 5,
        marginTop: 40,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white'
    },
    textInput: {
        height: 40, 
        borderColor: buttonColor,
        borderBottomWidth: 1,
        width: 330,
        marginVertical: 10
    },
    typePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default AddTask;