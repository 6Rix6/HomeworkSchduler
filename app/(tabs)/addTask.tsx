import { Text, View ,ScrollView, StyleSheet,Image,TextInput,TouchableOpacity,Platform } from 'react-native';
import { useState } from 'react';
import CustomParallaxScrollView from '@/components/CustomeParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter,useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

type Task = {
  kind: string;
  name: string;
  dueDate: string;
  priority: string;
  status: string;
}


export default function AddTaskScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const {kind} = useLocalSearchParams();
  const [task,setTask] = useState<Task>({
    kind: kind as string,
    name: "",
    dueDate: "",
    priority: "",
    status: "未着手",
  });
  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(Platform.OS === 'ios');
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(Platform.OS === 'ios');
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setTimePickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
  };  


  return (
  <CustomParallaxScrollView title='Add Task' icon="add">
      <View className='flex items-center justify-start p-5 flex-col'>
        <Text className={`text-2xl font-bold ${colorScheme=="dark"?"text-white":"text-[#333]"}`}>{kind}</Text>
        <TextInput
          placeholder='タスク名'
            className='border-2 border-gray-300 rounded-md p-2 w-32 mt-5'
          value={task.name}
          onChangeText={(text)=>setTask({...task,name:text})}
        />

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      { Platform.OS === 'android' &&
        <TouchableOpacity 
          onPress={() => {setDatePickerVisible(true)}} 
          style={{ borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 16 }}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      }
      { Platform.OS === 'android' &&
          <TouchableOpacity 
            onPress={() => {setTimePickerVisible(true)}} 
            style={{ borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 20, borderRadius: 5 }}
          >
            <Text style={{ fontSize: 16 }}>{date.toLocaleTimeString('ja-JP', timeOptions)}</Text>
          </TouchableOpacity>
      }

      { datePickerVisible &&
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
          locale="ja-JP"
          style={{marginBottom: 20}}
        />
      }
      { timePickerVisible &&
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
          locale="ja-JP"
          style={{marginBottom: 20}}
        />
      }

      <Text>{date.toLocaleDateString()} {date.toLocaleTimeString('ja-JP', timeOptions)}</Text>
    </View>

          <TextInput
            placeholder='優先度'
            className='border-2 border-gray-300 rounded-md p-2 w-32 mt-5'
          value={task.priority}
          onChangeText={(text)=>setTask({...task,priority:text})}
        />
        <TouchableOpacity
          className='bg-blue-500 rounded-md p-2 w-32 mt-5'
          onPress={()=>{
            if(task.name == "" || task.dueDate == "" || task.priority == ""){
              console.log("未入力");
              return;
            }
            console.log(task);
          }}
        >


          <Text className='text-white'>追加</Text>
        </TouchableOpacity>
      </View>
  </CustomParallaxScrollView>
  );
}