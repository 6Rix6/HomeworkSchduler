import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Platform,Dimensions } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const AddTaskDrawer = ({ isVisible, onClose }:any) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  useEffect(() => {
    NavigationBar.setPositionAsync('absolute');
    NavigationBar.setBackgroundColorAsync('transparent');
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return (
    <SafeAreaView className='absolute'>
      <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={styles.modal}
      className={`flex w-screen`}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      useNativeDriver
      useNativeDriverForBackdrop
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      >
        <View style={styles.drawer} className={`w-screen mt-auto outline-2 outline-primary-100 ${colorScheme=="dark"?"bg-primary-1000":"bg-primary-50"}`}>
          <View style={styles.headerContainer}>
            <Text style={styles.drawerTitle} className={`mt-auto mb-auto ${colorScheme=="dark"?"text-white":"text-[#333]"}`}>新しいタスク</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colorScheme=="dark"?"#fff":"#333"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.drawerItem} onPress={()=>{router.push({pathname:"/addTask",params:{kind:"homework"}});onClose();}}>
            <Ionicons name="book-outline" size={24} color={colorScheme=="dark"?"#fff":"#333"} />
            <Text style={styles.drawerText} className={`${colorScheme=="dark"?"text-white":"text-black"}`}>宿題を追加</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={()=>{router.push({pathname:"/addTask",params:{kind:"selfStudy"}});onClose();}}>
            <Ionicons name="checkmark-outline" size={24} color={colorScheme=="dark"?"#fff":"#333"} />
            <Text style={styles.drawerText} className={`${colorScheme=="dark"?"text-white":"text-black"}`}>自主学習を追加</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={()=>{router.push({pathname:"/addTask",params:{kind:"test"}});onClose();}}>
            <Ionicons name="calendar-outline" size={24} color={colorScheme=="dark"?"#fff":"#333"} />
            <Text style={styles.drawerText} className={`${colorScheme=="dark"?"text-white":"text-black"}`}>テストの予定を追加</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    display:"flex",
    justifyContent:"flex-end",
    margin: 0,
  },
  drawer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    minHeight: 300,
    elevation: 50,
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
