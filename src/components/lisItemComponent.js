import React, { useState } from 'react';
import database from '@react-native-firebase/database';
import { View, Text, Image, StyleSheet, TouchableHighlight, ToastAndroid, Platform, AlertIOS } from 'react-native';
import {touchHighlightColor, toolbarTouchHighlightColor, deleteButton} from '../../assets/colors';
import Swipeout from 'react-native-swipeout';

const ToDoListItem = (props) => {

    const clickedItem = () => {
        alert('Task clicked');
    };

    const longPressClicked = () => {
        props.longPressCallBack(props.item, props.index+1);
    };

    const [activeRowKey, setActiveRowKey] = useState(null);
    
    const notifyMessage = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
        }
    }

    const deleteTask = async () => {
        await database()
        .ref('/Task/' + props.index)
        .remove()
        .then(() => {
            notifyMessage('Task deleted successfully !');
        });
    }

    const swipeSettings = {
        autoClose: true,
        onClose: () => {
            if(activeRowKey !== null) {
                setActiveRowKey(null);
            }
        },
        onOpen: () => {
            setActiveRowKey(props.item.key);
        },
        right: [{
            text: 'Delete Task',
            backgroundColor: deleteButton,
            type: 'delete',
            underlayColor: toolbarTouchHighlightColor,
            onPress: () => deleteTask
        }],
        rowId: props.index,
        sectionId: 1
    };

    return (
        <Swipeout {...swipeSettings}>
            <TouchableHighlight onPress={clickedItem} onLongPress={longPressClicked} activeOpacity={0.7} underlayColor={touchHighlightColor}>
                <View style={ styles.mainContainer }>
                    {
                        (props.item.taskType === 'exersice') && <Image source={ require('./../../assets/images/bike.png') } style={styles.imageStyles}/>
                    }
                    {
                        (props.item.taskType === 'prayer') && <Image source={ require('./../../assets/images/prayer.png') } style={styles.imageStyles}/>
                    }
                    {
                        (props.item.taskType === 'study') && <Image source={ require('./../../assets/images/book.png') } style={styles.imageStyles}/>
                    }
                    {
                        (props.item.taskType === 'gaming') && <Image source={ require('./../../assets/images/game-controller.png') } style={styles.imageStyles}/>
                    }
                    {
                        (props.item.taskType === 'enjoy') && <Image source={ require('./../../assets/images/chill.png') } style={styles.imageStyles}/>
                    }
                    <View style={ styles.bioContainer }>
                        <Text style={ styles.title }>{props.item.title}</Text>
                        <View style={ styles.detailsContainer }>
                            <Text>{props.item.description}</Text>
                            <View>
                                <Text style={ styles.dateTime }>{props.item.date}</Text>
                                <Text style={ styles.dateTime }>{props.item.time}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeout>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 7,
      margin: 2,
      borderRadius: 5
    },
    imageStyles: {
        width: 50,
        height: 50,
        marginHorizontal: 5
    },
    bioContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 17
    },
    dateTime: {
        color: '#6d6d6d',
        fontSize: 13,
        textAlign: 'right'
    }
});

export default ToDoListItem;