import { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';

export default function TaskAddButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    console.log('Task Added:', { taskName, dueDate });
    setModalVisible(false);
    setTaskName('');
    setDueDate('');
  };

  return (
    <View className="p-5">
      <TouchableOpacity
        className="px-4 py-4 rounded-lg h-20 w-40 border-gray-300 border bg-gray-800"
        onPress={() => setModalVisible(true)}
      >
        {/* <Text className="text-white font-bold ">タスクを追加</Text> */}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-100 bg-opacity-50">
          <View className="w-4/5 p-6 bg-white rounded-lg">
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
            <View className="flex-row justify-between">
              <Button title="キャンセル" onPress={() => setModalVisible(false)} />
              <Button title="追加" onPress={addTask} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
