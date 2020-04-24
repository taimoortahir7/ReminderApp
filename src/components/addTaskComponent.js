import React, { useState } from 'react';
import database from '@react-native-firebase/database';
import { View, TextInput, Text, ToastAndroid, Platform, AlertIOS, StyleSheet } from 'react-native';
import {Picker} from '@react-native-community/picker';
import {buttonColor, secondaryColor} from '../../assets/colors';
import Toolbar from './toolbarComponent';
import DateTimeComponent from './dateTimeComponent';
import moment from "moment";
import {textInputChangeFunc, checkFieldsValidity} from './../commons/fieldsValidation';
import ReactNativeAN from 'react-native-alarm-notification';

const AddTask = ({ route, navigation }) => {

    const { screenName } = route.params;
    const { item } = route.params || undefined;

    let titleTextInput, descriptionTextInput;

    const [title, onChangeTitle] = useState(item?.title || '');
    const [description, onChangeDescription] = useState(item?.description || '');
    const [date, setDate] = useState(item?.date || moment(new Date()).format("DD-MM-YYYY"));
    const [time, setTime] = useState(item?.time || moment(new Date()).format("hh:mm:ss"));
    const [taskType, setTaskType] = useState(item?.taskType || "exersice");

    const fireDate = date + ' ' + time;	

    const alarmNotifData = {
        alarm_id: 1,
        title: title,
        message: description,
        channel: "my_channel_id",
        small_icon: "ic_launcher",
        color: secondaryColor,
        fire_date: fireDate,
        schedule_type: 'once',
        // You can add any additional data that is important for the notification
        // It will be added to the PendingIntent along with the rest of the bundle.
        // e.g.
        data: { foo: "bar" }
    };

    const dateTimeRenderer = (value, mode) => {
        if(mode === 'date') {
            setDate(value);
        } else if(mode === 'time') {
            setTime(value);
        }
    };

    const fieldValueChangeFunc = (text, titleTextInput, type) => {
        textInputChangeFunc(text, titleTextInput);
        if(type === 'title') {
            onChangeTitle(text);
        } else if(type === 'description') {
            onChangeDescription(text);
        }
    };

    const submitData = (type) => {
        const fields = [
            {
                value: title,
                reference: titleTextInput
            },
            {
                value: description,
                reference: descriptionTextInput
            }
        ];
        if(checkFieldsValidity(fields)) {
            if(type === 'addData') {
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
                    //Schedule Future Alarm
                    ReactNativeAN.scheduleAlarm(alarmNotifData);
                    //Send Local Notification Now
                    // ReactNativeAN.sendNotification(alarmNotifData);
                    notifyMessage('Task added successfully !');
                    navigation.goBack();
                });

            } else if(type === 'editData') {
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
            }
        }
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
        <Toolbar
            title='ReminderApp' 
            subTitle='List of Tasks' 
            navigation={navigation} 
            screenName={screenName} 
            taskDataCallback={submitData} 
        />

        <View style={ styles.innerContainer }>
            <TextInput
                style={ styles.textInput }
                onChangeText={text => fieldValueChangeFunc(text, titleTextInput, 'title')}
                placeholder='Title'
                textContentType='jobTitle'
                maxLength={20}
                defaultValue={item?.title || undefined}
                ref={r=>titleTextInput=r}
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
                onChangeText={text => fieldValueChangeFunc(text, descriptionTextInput, 'description')}
                placeholder='One line description'
                textContentType='jobTitle'
                maxLength={50}
                defaultValue={item?.description || undefined}
                ref={r=>descriptionTextInput=r}
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