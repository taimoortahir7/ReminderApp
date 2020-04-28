import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, RefreshControl, ActivityIndicator, BackHandler, Modal, Text, TouchableOpacity } from 'react-native';
import ToDoListItem from './lisItemComponent';
import Toolbar from './toolbarComponent';
// import { getTasks } from './../../network/server';
import Placeholder from './placeholderComponent';
import database from '@react-native-firebase/database';
import {primaryColor, secondaryColor, buttonColor} from '../../assets/colors';

const ToDoList = ({ route, navigation }) => {

  const { screenName } = route.params;
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisiblity] = useState(false);
  const [listItem, setListItem] = useState();
  const [listItemIndex, setListItemIndex] = useState();
  var dataArray = [];

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    // onRefreshFromServer();
    getTasksFirebase();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
    
  }, []);

  const getTasksFirebase = () => {
    database().ref('Task').once('value').then(snapshot => {
      dataArray = [];

      // to convert firebase returned object of items into array
      snapshot.forEach(function(snap) {
        var item = snap.val();
        item.key = snap.key;

        dataArray.push(item);
      });

      setData(dataArray);
      setLoadingActivity(false);
      setLoading(false);
    });
  };

  const editTask = async () => {
      setModalVisiblity(false);
      navigation.navigate('AddTask', {
        item: listItem,
        screenName: 'EditTask'
    });
  }

  const deleteTask = async () => {
    setModalVisiblity(false);
    await database()
    .ref('Task/' + listItem.key)
    .remove()
    .then(() => {
      setModalVisiblity(false);
      notifyMessage('Task deleted successfully !');
    });
  }

  const cancel = () => {
    setModalVisiblity(false);
  };

  const longPressCallBack = (item, index) => {
    setListItem(item);
    setListItemIndex(index);
    setModalVisiblity(true);
  };

  // const onRefreshFromServer = () => {
  //   getTasks().then((tasks) => {
  //     setData(tasks);
  //     setLoadingActivity(false);
  //     setLoading(false);
  //   }).catch((error) => {
  //     console.log('error: ', error);
  //     setData([]);
  //     setLoadingActivity(false);
  //     setLoading(false);
  //   });
  // };

  return (
    <View style={ styles.mainContainer }>
      <Toolbar title='ReminderApp' navigation={navigation} screenName={screenName}/>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getTasksFirebase} />
        }
      >
        {
          (loadingActivity) && (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color={secondaryColor} />
            </View>
          )
        }
        {
          (!loadingActivity) && (
            <FlatList
              data={data}
              renderItem={({item, index}) => <ToDoListItem item={item} index={index} longPressCallBack={longPressCallBack}/>}
              keyExtractor={item => item.key}
              ListEmptyComponent={<Placeholder navigation={navigation} screenName={screenName}/>}
              style={ styles.listStyles }
            />
          )
        }
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={ styles.modalContainer }>
          <View style={ styles.modalView }>
            <Text style={ styles.modalTitle }>{listItem?.title}</Text>
            <Text style={ styles.modalDescription }>{listItem?.description}</Text>

            <View style={ styles.buttonsContainer }>
              <TouchableOpacity style={ styles.editButton } onPress={editTask}>
                <Text style={ styles.editButtonText }>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ styles.deleteButton } onPress={deleteTask}>
                <Text style={ styles.deleteButtonText }>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ styles.cancelButton } onPress={cancel}>
                <Text style={ styles.cancelButtonText }>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  listStyles: {
    marginHorizontal: 5
  },
  scrollView: {
    flex: 1,
    backgroundColor: primaryColor
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    width: 300,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
  modalTitle: {
    marginBottom: 10, 
    fontSize: 23
  },
  modalDescription: {
    fontSize: 18
  },
  buttonsContainer: {
    width: 220,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5
  },
  deleteButtonText: {
    textAlign: 'center',
    color: 'white',
    padding: 10
  },
  editButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: secondaryColor,
    marginVertical: 10
  },
  editButtonText: {
    textAlign: 'center',
    color: secondaryColor,
    padding: 10
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: buttonColor,
    marginVertical: 10
  },
  cancelButtonText: {
    textAlign: 'center',
    color: buttonColor,
    padding: 10
  },
});

export default ToDoList;