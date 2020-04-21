import React, { useState } from 'react';
import { View, Text, TextInput, Platform, StyleSheet, TouchableHighlight } from 'react-native';
import {buttonColor, toolbarTouchHighlightColor, secondaryColor} from '../../assets/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import moment from "moment";

const DateTimeComponent = (props) => {

    const [date, setDate] = useState(props.date || moment(new Date()).format("DD-MM-YYYY"));
    const [time, setTime] = useState(props.time || moment(new Date()).format("hh:mm:ss"));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedValue) => {
        if(mode === 'date') {
            const currentDate = moment(selectedValue).format("DD-MM-YYYY") || date;
            setDate(currentDate);
            props.dateTimeCallBack(currentDate, mode);
        } else if(mode === 'time') {
            const currentTime = moment(selectedValue).format("hh:mm:ss") || time;
            setTime(currentTime);
            props.dateTimeCallBack(currentTime, mode);
        }
        setShow(Platform.OS === 'ios');
    };
    
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };

  return (
      <>
        <View style={ styles.dateTimeContainer }>
            <Text>Select Date & Time</Text>

            <View style={ styles.dateTimeButtonsContainer }>
                <View style={ styles.dateContainer }>
                    <TouchableHighlight
                        onPress={showDatepicker}
                        activeOpacity={1}
                        underlayColor={toolbarTouchHighlightColor}
                        style={ styles.dateTimeIcon }
                        >
                            <IconFontisto name="date" size={23} color="white"/>
                    </TouchableHighlight>
                    <TextInput
                        style={ styles.dateTimeTextInput }
                        value={date.toString()}
                        placeholder='Date'
                        textContentType='jobTitle'
                        editable={false}
                    />
                </View>

                <View style={ styles.timeContainer }>
                    <TouchableHighlight
                        onPress={showTimepicker}
                        activeOpacity={1}
                        underlayColor={toolbarTouchHighlightColor}
                        style={ styles.dateTimeIcon }
                        >
                            <IconAntDesign name="clockcircleo" size={23 } color="white"/>
                    </TouchableHighlight>
                    <TextInput
                        style={ styles.dateTimeTextInput }
                        value={time.toString()}
                        placeholder='Time'
                        textContentType='jobTitle'
                        editable={false}
                    />
                </View>

            </View>

        </View>

        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={parseFloat(date)}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        )}
    </>
  );
};

const styles = StyleSheet.create({
    dateTimeTextInput: {
        height: 40, 
        borderColor: buttonColor,
        borderBottomWidth: 1,
        width: 90,
        color: '#6d6d6d'
    },
    dateTimeContainer: {
        width: 330,
        borderWidth: 1,
        borderRadius: 8,
        padding: 20,
        borderColor: secondaryColor,
        marginVertical: 30
    },
    dateTimeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    dateTimeIcon: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: buttonColor
    },
    dateContainer: {
        flexDirection: 'row'
    },
    timeContainer: {
        flexDirection: 'row'
    }
});

export default DateTimeComponent;