import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Platform,Dimensions,TextInput,KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, useState,useRef } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskType } from '@/constants/typescript.types';
import Entypo from '@expo/vector-icons/Entypo';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const AddTaskDrawer = ({ isVisible, onClose }:any) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [selectedTaskType, setSelectedTaskType] = useState<string>("");
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [d1,setD1] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [task, setTask] = useState<TaskType>({
    id: "",
    kind: "",
    name: "",
    dueDate: new Date(),
    priority: 1,
    status: "未着手",
  });
  useEffect(() => {
    NavigationBar.setPositionAsync('absolute');
    NavigationBar.setBackgroundColorAsync('transparent');
    NavigationBar.setButtonStyleAsync('light');
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  useEffect(() => {
    setTask({...task, kind: selectedTaskType});
  }, [selectedTaskType]);


  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if(event.type == "dismissed"){
      setDatePickerVisible(false);
      return;
    }
    const currentDate = selectedDate || new Date();
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
    setTimePickerVisible(true);
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    if(event.type == "dismissed"){
      setTimePickerVisible(false);
      return;
    }
    const currentTime = selectedTime || new Date();
    //console.log(currentTime.toString());
    setTimePickerVisible(Platform.OS === 'ios');
    setDate(currentTime);
    setD1(currentTime.getFullYear() + '/' + ('0' + (currentTime.getMonth() + 1)).slice(-2) + '/' +('0' + currentTime.getDate()).slice(-2) + '   ' +  ('0' + currentTime.getHours()).slice(-2) + ':' + ('0' + currentTime.getMinutes()).slice(-2));
    setTask({...task, dueDate: currentTime});
  };

  const handleClose = () => {
    // すべてのstateをリセット
    setSelectedTaskType("");
    setDatePickerVisible(false);
    setTimePickerVisible(false);
    setD1("");
    setDate(new Date());
    if (inputRef.current) {
      inputRef.current.clear();
    }    
    onClose();
  };

  return (
    <View className="h-screen absolute">
    <View className='relative bg-black'>
      <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={styles.modal}
      className={`flex w-screen relative`}
      onBackButtonPress={handleClose}
      onSwipeComplete={handleClose} 
      onBackdropPress={handleClose}
      swipeDirection="down"
      useNativeDriver={false}
      useNativeDriverForBackdrop={true}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      hideModalContentWhileAnimating
      statusBarTranslucent={true}
      >
        <View className="h-screen absolute z-400">
        <View style={styles.drawer} className={`w-screen mt-auto outline-2 outline-primary-100 ${colorScheme=="dark"?"bg-primary-1000":"bg-primary-50"}`}>
          <View style={styles.headerContainer}>
            <Text style={styles.drawerTitle} className={`mt-auto mb-auto ${colorScheme=="dark"?"text-white":"text-[#333]"}`}>新しいタスク</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colorScheme=="dark"?"#fff":"#333"} />
            </TouchableOpacity>
          </View>
          <View className="w-full">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full">
              <TextInput 
                placeholder="タスク名" 
                placeholderTextColor={"gray"} 
                className={`border-b-2 text-xl border-primary-500 rounded-lg p-2 w-full ${colorScheme=="dark"?"bg-primary-1000":"bg-primary-50"}`}
                autoFocus={true}
                ref={inputRef}
                onChangeText={(text) => setTask({...task, name: text})}
            />
            </KeyboardAvoidingView>
            <View className="w-full flex-row mt-3">
              <TouchableOpacity 
                className={`mr-2      bg-primary-100 rounded-lg p-2 text-black ${selectedTaskType === "homework" ? "border-primary-500 border-2" : "border-2 border-primary-100"}`}
                onPress={() => setSelectedTaskType("homework")}
                >
                <Text className="text-center text-black">宿題</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`mr-2 ml-2 bg-primary-100 rounded-lg p-2 text-black ${selectedTaskType === "self-study" ? "border-primary-500 border-2" : "border-2 border-primary-100"}`}
                onPress={() => setSelectedTaskType("self-study")}
                >
                <Text className="text-center text-black">自主学習</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`mr-2 ml-2 bg-primary-100 rounded-lg p-2 text-black ${selectedTaskType === "test" ? "border-primary-500 border-2" : "border-2 border-primary-100"}`}
                onPress={() => setSelectedTaskType("test")}
                >
                <Text className="text-center text-black">テスト</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`mr-2 ml-2 bg-primary-100 rounded-lg p-2 text-black ${selectedTaskType === "other" ? "border-primary-500 border-2" : "border-2 border-primary-100"}`}
                onPress={() => setSelectedTaskType("other")}
                >
                <Text className="text-center text-black font-bold">. . .</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-5">
              <TouchableOpacity 
                className={`border-b-2 text-xl border-primary-500 rounded-lg p-2 w-full ${colorScheme=="dark"?"bg-primary-1000":"bg-primary-50"}`}
                onPress={() => setDatePickerVisible(true)}
              >
                <Text className={`text-xl text-black  ${d1!=""? "":"text-gray-500"}`}>{d1!=""? d1:"期限を選択"}</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-5">
              <TouchableOpacity 
              className="bg-primary-500 rounded-lg p-2 w-full"
              onPress={() => {
                console.log(task.dueDate.toString());
              }}
              >
                <Text className="text-xl text-white text-center">追加</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>
      </Modal>
      {datePickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          locale="ja-JP"
          themeVariant={colorScheme=="dark"?"dark":"light"}
          onChange={onDateChange}
        />
      )}
      {timePickerVisible && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          locale="ja-JP"
          themeVariant={colorScheme=="dark"?"dark":"light"}
          onChange={onTimeChange}
        />
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    display:"flex",
    justifyContent:"flex-end",
    margin: 0,
    zIndex: 300,
  },
  drawer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    minHeight: 400,
    elevation: 50,
    zIndex: 500,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
    marginBottom: "auto",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    width: "100%",
  },
  drawerText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AddTaskDrawer;
