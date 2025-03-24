import { Text, View ,ScrollView, StyleSheet,Image, TouchableOpacity } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomeParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TaskType } from '@/constants/typescript.types';
import { useState, useEffect } from 'react';
import { storage } from '@/constants/strage';
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    setTasks(loadTasks());
    console.log(tasks);
  }, [storage.getString('tasks')]); 

  const loadTasks = (): TaskType[] => {
    const tasksJson = storage.getString('tasks');
    if (tasksJson === undefined) {
      console.log('tasksJson is undefined');
      return []
    };
    // タスクを取得
    const tasks = JSON.parse(tasksJson);
    return tasks.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate), // 文字列を Date オブジェクトに変換
        dueTime: new Date(task.dueTime), // 文字列を Date オブジェクトに変換
    }));
};

  return (
  <CustomParallaxScrollView title='Task' icon="bars">
    <View className='p-7 w-full'>
    <View>
      <Text>!!!デバッグ用!!!</Text>
      <TouchableOpacity onPress={() => {
        storage.set('tasks', JSON.stringify([]));
        setTasks(loadTasks());
      }}
      className='bg-gray-100 rounded-lg p-2 border-2 border-primary-500'
      >
        <Text>taskをリセット</Text>
      </TouchableOpacity>
    </View>
    {tasks.map((task) => (
      <View key={task.dueDate.toISOString()} className='flex flex-row items-center mt-2 justify-between'>
        <View  className='flex flex-row justify-between p-2 bg-gray-100 w-5/6 rounded-lg border-2 border-primary-500'>
          <Text className='text-2xl font-bold text-wrap'>{task.name}</Text>
          <View className='flex flex-row justify-between w-4/12'>
            <Text className='text-lg font-bold'>{task.dueDate.toLocaleDateString('ja-JP',{month: '2-digit', day: '2-digit'})}</Text>
            <Text className='text-lg font-bold'>{task.dueTime.toLocaleTimeString('ja-JP',{hour: '2-digit', minute: '2-digit'})}</Text>
          </View>
        </View>
        <TouchableOpacity className='flex flex-row items-center border-2 border-primary-500 rounded-lg p-2 ml-2 bg-gray-100 h-full'>      
            <Feather name="check-square" size={30} color="black" />
        </TouchableOpacity>
      </View>
    ))}
    <View className='h-20'></View>
    </View>
  </CustomParallaxScrollView>
  );
}