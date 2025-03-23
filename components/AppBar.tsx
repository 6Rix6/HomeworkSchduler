import { Text, TouchableOpacity, View } from 'react-native';
import HamburgerMenuIcon from '@/assets/icons/hamburger-menu';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function AppBar(props:any) {
  const colorScheme = useColorScheme();
  
  return (
    <SafeAreaView className={`flex flex-row border-b ${colorScheme === "dark"?`border-gray-300`:`border-gray-900`} w-full p-2 items-start`}>
    <View className='flex-row'>
        <Text className={`text-3xl font-bold  ml-3 ${colorScheme === "dark"?'text-white':'text-black'}`}>
          {props.title}
        </Text>
    </View>
    </SafeAreaView>
  );
}