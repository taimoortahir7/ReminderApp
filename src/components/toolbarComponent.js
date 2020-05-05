import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
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

    const profileEdit = () => {
        props.editProfileCallBack();
    };

    const editDisabled = () => {
        props.editDisabled();
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
                            <IconAntDesign name="arrowleft" size={25} color="white"/>
                        </TouchableHighlight>
                    )
                }
            </View>
            <View style={ (props.screenName === 'AddTask' || props.screenName === 'EditTask') ? styles.infoContainer : styles.infoContainerMargin }>
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
                        <IconAntDesign name="check" size={25} color="white"/>
                </TouchableHighlight>)
            }
            {
                (props.editEnabled) && (
                <TouchableHighlight
                    onPress={editDisabled}
                    activeOpacity={1}
                    underlayColor={toolbarTouchHighlightColor}
                    style={ styles.backIcon }
                    >
                        <IconAntDesign name="close" size={25} color="white"/>
                </TouchableHighlight>)
            }
            {
                (props.editEnabled) && (
                <TouchableHighlight
                    onPress={editDisabled}
                    activeOpacity={1}
                    underlayColor={toolbarTouchHighlightColor}
                    style={ styles.backIcon }
                    >
                        <IconAntDesign name="check" size={25} color="white"/>
                </TouchableHighlight>)
            }
            {
                (props.screenName === 'Profile' && !props?.editEnabled) && (
                <TouchableHighlight
                    onPress={profileEdit}
                    activeOpacity={1}
                    underlayColor={toolbarTouchHighlightColor}
                    style={ styles.backIcon }
                    >
                        <IconAntDesign name="edit" size={25} color="white"/>
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
                        <IconAntDesign name="plus" size={25} color="white"/>
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
    infoContainerMargin: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 30
    },
    backIconContainer: {
        paddingTop: 15,
        paddingBottom: 15
    },
    backIcon: {
        borderRadius: 30,
        padding: 15,
        marginHorizontal: 5
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