import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {secondaryColor, toolbarTouchHighlightColor, subTitleColor} from '../../assets/colors';

const Toolbar = (props) => {

    const [open, setOpen] = useState(false);

    const clickedBackIcon = () => {
        if(props.screenName === 'AddTask' || props.screenName === 'EditTask') {
            props.navigation.goBack();
        } else {
            alert('Close hamburger menu');
        }
        // setOpen(!open);
        // if(open) {
        //     alert('Open hamburger menu');
        // } else {
        //     alert('Close hamburger menu');
        // }
    };

    const addTask = () => {
        props.taskDataCallback('addData');
    };

    const editTask = () => {
        props.taskDataCallback('editData');
    };

    const profileMenu = () => {

    };

    const navigateToAddTask = () => {
        // add params including screen name
        props.navigation.navigate('AddTask', {
            screenName: 'AddTask'
        });
    };

    return (
        <View style={ styles.mainContainer }>
            <View style={ styles.backIconContainer }>
                {
                    (props.screenName === 'AddTask' || props.screenName === 'EditTask') && (
                        <TouchableHighlight
                        onPress={clickedBackIcon}
                        activeOpacity={1}
                        underlayColor={toolbarTouchHighlightColor}
                        style={ styles.backIcon }
                        >
                            <Icon name="arrowleft" size={25} color="white"/>
                        </TouchableHighlight>
                    )
                }
            </View>
            <View style={ styles.infoContainer }>
                <Text style={ styles.title }>{props.title}</Text>
                {/* <Text style={ styles.subTitle }>{props.subTitle}</Text> */}
            </View>

            {
                (props.screenName === 'AddTask' || props.screenName === 'EditTask') && (
                <TouchableHighlight
                    onPress={(props.screenName === 'AddTask') ? addTask : editTask}
                    activeOpacity={1}
                    underlayColor={toolbarTouchHighlightColor}
                    style={ styles.backIcon }
                    >
                        <Icon name="check" size={25} color="white"/>
                </TouchableHighlight>)
            }
            {
                (props.screenName === 'Profile') && (
                <TouchableHighlight
                    onPress={profileMenu}
                    activeOpacity={1}
                    underlayColor={toolbarTouchHighlightColor}
                    style={ styles.menuIcon }
                    >
                        <IconFontisto name="more-v-a" size={23} color="white"/>
                </TouchableHighlight>)
            }
            {
                (props.screenName !== 'AddTask' && props.screenName !== 'EditTask' && props.screenName !== 'Profile') && (
                <TouchableHighlight
                    onPress={navigateToAddTask}
                    activeOpacity={1}
                    underlayColor={toolbarTouchHighlightColor}
                    style={ styles.backIcon }
                    >
                        <Icon name="plus" size={25} color="white"/>
                </TouchableHighlight>)
            
            }

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: secondaryColor,
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    backIconContainer: {
        padding: 15
    },
    backIcon: {
        borderRadius: 30,
        padding: 15
    },
    menuIcon: {
        borderRadius: 50,
        padding: 15, 25
    },
    title: {
        fontSize: 23,
        color: 'white'
    },
    subTitle: {
        fontSize: 15,
        color: subTitleColor
    },
});

export default Toolbar;