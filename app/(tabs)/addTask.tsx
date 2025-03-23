import { Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import CustomParallaxScrollView from '@/components/CustomeParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AddHomework from '@/components/AddHomework';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export default function HomeScreen() {
  const { kind } = useLocalSearchParams();

  return (
    <CustomParallaxScrollView title='Add Task' icon='add'>
      {kind == 'homework' && <AddHomework />}
    </CustomParallaxScrollView>
  );
}
