import { useState } from 'react';
import { Text, View ,ScrollView, StyleSheet,Image,TouchableOpacity,TextInput,Button } from 'react-native';
import { StatusBar } from "expo-status-bar";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#14b8a6', dark: '#042f2e' }}
        headerImage={
            <Text className={`font-bold text-3xl text-blac m-auto ${colorScheme=="dark"?'text-white':'text-white'}`}>タスクを追加</Text>
        }>
        <View className={`flex items-center justify-start flex-col p-0 ${colorScheme=="dark"?'text-black':'text-white'}`}>
            <View className="flex-1 justify-center items-center w-full">
                <View className="w-full p-6 rounded-lg">
                    <Text className="text-lg font-bold mb-2">タスクを追加</Text>
                    <TextInput
                        className="border border-gray-300 rounded p-2 mb-2"
                        placeholder="タスク名"
                        value={taskName}
                        onChangeText={setTaskName}
                    />
                    <TextInput
                        className="border border-gray-300 rounded p-2 mb-4"
                        placeholder="期限 (YYYY-MM-DD)"
                        value={dueDate}
                        onChangeText={setDueDate}
                    />
                    <View className="flex-row items-end w-full">
                        <Button title="追加" onPress={()=>{}} />
                    </View>
                </View>
            </View>
        </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});