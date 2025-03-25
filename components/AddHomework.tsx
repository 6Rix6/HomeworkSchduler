import { Text, View, TextInput, TouchableOpacity, Platform, Dimensions, Animated } from 'react-native';
import { useState } from 'react';
import CustomParallaxScrollView from '@/components/CustomeParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { primaryColors } from '@/constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import { TaskTypeOld } from '@/constants/typescript.types';
import { storage } from '@/constants/strage';

export default function AddHomework() {
    const deviceHeight = Dimensions.get('window').height;
    
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [task, setTask] = useState<TaskTypeOld>({
        id: '',
        kind: 'homework',
        name: '',
        dueDate: new Date(),
        dueTime: new Date(),
        priority: null,
        status: '未着手',
    });
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(Platform.OS === 'ios');
    const [timePickerVisible, setTimePickerVisible] = useState<boolean>(Platform.OS === 'ios');
    const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
    const [isTimeSelected, setIsTimeSelected] = useState<boolean>(false);
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const [isCompleted, setIsCompleted] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];
    const scaleAnim = useState(new Animated.Value(0))[0];

    const onDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        setDatePickerVisible(Platform.OS === 'ios');
        setTask({ ...task, dueDate: currentDate });
        setIsDateSelected(true);
    };

    const onTimeChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        setTimePickerVisible(Platform.OS === 'ios');
        setTask({ ...task, dueTime: currentDate });
        setIsTimeSelected(true);
    };

    const saveTask = (newTask: TaskTypeOld) => {
        try {
            // 既存のタスクを取得
            const existingTasksJson = storage.getString('tasks');
            const existingTasks: TaskTypeOld[] = existingTasksJson ? JSON.parse(existingTasksJson) : [];
            
            // 新しいタスクにIDを付与
            const taskWithId = {
                ...newTask,
                id: Date.now().toString(),
                dueDate: newTask.dueDate.toISOString(), // Dateオブジェクトを文字列に変換
                dueTime: newTask.dueTime.toISOString(), // Dateオブジェクトを文字列に変換
            };
            
            // タスクを配列に追加
            const updatedTasks = [...existingTasks, taskWithId];

            // 保存
            storage.set('tasks', JSON.stringify(updatedTasks));            
            return true;
        } catch (error) {
            console.error('タスクの保存に失敗しました:', error);
            return false;
        }
    };

    const showCompletionAnimation = () => {
        const saveResult = saveTask(task);
        if (!saveResult) {
            console.error('タスクの保存に失敗しました');
            return;
        }

        setIsCompleted(true);
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 4,
                    useNativeDriver: true,
                })
            ]),
            Animated.delay(1000),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setIsCompleted(false);
            scaleAnim.setValue(0);
            router.push('/task');
            setTask({
                id: '',
                kind: 'homework',
                name: '',
                dueDate: new Date(),
                dueTime: new Date(),
                priority: null,
                status: '未着手',
            });
            setIsDateSelected(false);
            setIsTimeSelected(false);
        });
    };



    return (
    <View className='w-full h-screen'>
        <View className='p-7 flex flex-col' style={{height: deviceHeight-150}}>

        {/* タイトル */}
        <View className='w-full'>
            <Text className={`text-3xl font-bold ${colorScheme=="dark"?"text-primary-200":"text-primary-500"}`}>宿題を追加</Text>
        </View>

        <View className=' p-0 flex flex-col justify-between h-full'>
            <View>
                {/* タスク名入力 */}
                <View className='w-full mt-16'>
                    <Text className={`text-xl font-bold ${colorScheme=="dark"?"text-primary-200":"text-primary-500"}`}>タスク名</Text>
                        <View className='flex flex-row items-center'>
                            <TextInput
                            placeholder='例：数学'
                            placeholderTextColor="gray"
                            className={`border-2  rounded-lg p-3 w-full mt-2 text-xl ${colorScheme=="dark"?"border-primary-200 text-white":"border-primary-500 text-black"}`}
                            value={task.name}
                            onChangeText={(text) => setTask({ ...task, name: text })}
                            />
                    </View>
                </View>

                {/* 日時選択 */}
                <View className='w-full mt-5'>
                    <Text className={`text-xl font-bold ${colorScheme=="dark"?"text-primary-200":"text-primary-500"}`}>期限</Text>
                    <View className='flex flex-row justify-between items-center mt-2'>
                        { Platform.OS === 'android' &&
                            <TouchableOpacity 
                            onPress={() => {setDatePickerVisible(true)}} 
                            className={`border-2  rounded-lg p-3 text-xl w-1/2 ${colorScheme=="dark"?"border-primary-200":"border-primary-500"}`}
                            >
                                <Text className={`text-lg ${colorScheme=="dark"?isDateSelected?"text-white":"text-gray-500":isDateSelected?"text-black":"text-gray-500"}`}>{task.dueDate?.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                        }
                        { Platform.OS === 'android' &&
                            <TouchableOpacity 
                                onPress={() => {setTimePickerVisible(true)}} 
                                className={`border-2  rounded-lg p-3 text-lg w-5/12 ${colorScheme=="dark"?"border-primary-200":"border-primary-500"}`}
                            >
                                <Text className={`text-lg ${colorScheme=="dark"?isTimeSelected?"text-white":"text-gray-500":isTimeSelected?"text-black":"text-gray-500"}`}>{task.dueDate?.toLocaleTimeString('ja-JP', timeOptions)}</Text>
                            </TouchableOpacity>
                        }
                        { datePickerVisible &&
                            <DateTimePicker
                            value={task.dueDate!=null?task.dueDate:new Date()}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                            locale="ja-JP"
                            themeVariant={colorScheme=="dark"?"dark":"light"}
                            accentColor={primaryColors[500]}
                            style={{backgroundColor:primaryColors[500]}}
                            />
                        }
                        { timePickerVisible &&
                            <DateTimePicker
                            value={task.dueTime!=null?task.dueTime:new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                            locale="ja-JP"
                            themeVariant={colorScheme=="dark"?"dark":"light"}
                            accentColor={primaryColors[500]}
                            />
                        }
                    </View>
                </View>


                {/* 優先度選択 */}
                <View className='w-full mt-5'>
                    <Text className={`text-xl font-bold ${colorScheme=="dark"?"text-primary-200":"text-primary-500"}`}>優先度</Text>
                    <TextInput
                        keyboardType='numeric'
                        placeholder='例: 1'
                        placeholderTextColor="gray"
                        className={`border-2  rounded-lg p-3 w-full text-lg mt-2 ${colorScheme=="dark"?"border-primary-200 text-white":"border-primary-500 text-black"}`}
                        value={task.priority ? task.priority.toString() : ''}
                        onChangeText={(text) => setTask({ ...task, priority: parseInt(text) })}
                    />
                </View>
            </View>

            {/* 追加ボタン */}
            <TouchableOpacity
                className={`rounded-lg p-4 w-full flex mb-10 items-center ${colorScheme=="dark"?"bg-primary-200":"bg-primary-500"}`}
                activeOpacity={0.7}
                onPress={() => {
                    if (task.name === '' || isDateSelected === false || isTimeSelected === false || task.priority === null) {
                        console.log('未入力');
                        return;
                    }
                    //console.log(task);
                    showCompletionAnimation();
                }}
            >
                <Text className={`text-lg font-bold ${colorScheme=="dark"?"text-black":"text-white"}`}>追加</Text>
            </TouchableOpacity>
        </View>
        </View>
        {/* 追加完了アニメーション */}
        {isCompleted && (
                <Animated.View 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: fadeAnim,
                        zIndex: 1000,
                    }}
                    className="w-full h-full"
                >
                    <Animated.View 
                        style={{
                            transform: [{ scale: scaleAnim }],
                            backgroundColor: colorScheme == "dark" ? primaryColors[200] : primaryColors[500],
                            borderRadius: 50,
                            padding: 20,
                            top: -50,
                        }}
                    >
                        <Ionicons name="checkmark-circle-outline" size={50} color={colorScheme == "dark" ? "black" : "white"} />
                    </Animated.View>
                    <Animated.Text 
                        style={{
                            color: 'white',
                            fontSize: 18,
                            marginTop: 0,
                            fontWeight: 'bold',
                        }}
                    >
                        追加しました
                    </Animated.Text>
                </Animated.View>
            )}
    </View>
  );
}
