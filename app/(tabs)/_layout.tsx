import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { primaryColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AddTaskDrawer from '@/components/AddTaskDrawer';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import "@/global.css"


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const appBarBackground = colorScheme=="dark"?primaryColors[1000]:primaryColors[50];
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    NavigationBar.setPositionAsync('absolute');
    NavigationBar.setBackgroundColorAsync('transparent');
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: true,
        tabBarStyle: {...styles.tabBar,backgroundColor:appBarBackground},
        headerShown:false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={26} color={color} />,
          tabBarButton: (props) => <NoRippleButton {...props} />,
        }}
        
      />
      <Tabs.Screen
        name="today"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => <Ionicons name="today-outline" size={24} color={color} />,
          tabBarButton: (props) => <NoRippleButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="addTask"
        options={{
          tabBarButton: (props) => <CustomAddButton {...props} onPress={() => setDrawerOpen(true)}/>,
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: 'Task',
          tabBarIcon: ({ color }) => <AntDesign name="bars" size={28} color={color} />,
          tabBarButton: (props) => <NoRippleButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <AntDesign name="calendar" size={25} color={color} />,
          tabBarButton: (props) => <NoRippleButton {...props} />,
        }}
      />
    </Tabs>
      <AddTaskDrawer isVisible={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

const CustomAddButton = ({ onPress }:any) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress} activeOpacity={0.7}>
    <MaterialIcons name="add-box" size={40} color="white" />
  </TouchableOpacity>
);

const NoRippleButton = ({ onPress, children }:any) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.noRipple}>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: primaryColors[500],
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -20,
    marginLeft:"auto",
    marginRight:"auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  noRipple: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
