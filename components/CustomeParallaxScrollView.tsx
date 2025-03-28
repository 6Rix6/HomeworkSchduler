import ParallaxScrollView from "./ParallaxScrollView";
import type { PropsWithChildren, ReactElement } from 'react';
import { Text, View ,ScrollView, StyleSheet,Image } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { primaryColors } from '@/constants/Colors';



type Props = PropsWithChildren<{
    title:string;
    icon:string;
}>;

export default function CustomParallaxScrollView({title,icon,children}:Props){
    const colorScheme = useColorScheme();
    
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: primaryColors['500'], dark: primaryColors['1000'] }}
            headerImage={
              <View className='flex-row flex-1 items-center w-full h-full'>
                <View className='p-5'>
                  <Text className={`font-bold text-4xl text-blac ${colorScheme=="dark"?'text-white':'text-white'}`}>
                      {title}
                  </Text>
                </View>
                  <View className='flex p-0 items-start ml-auto'>
                  {icon == "home" && <AntDesign name="home" size={150} color={"#99f6e4"} style={{marginTop:-10}}/>}
                  {icon == "today"    && <Ionicons  name="today-outline"  size={150} color={"#99f6e4"} />}
                  {icon == "bars" && <AntDesign name={"bars"} size={150} color={"#99f6e4"} style={{marginTop:-10}}/>}
                  {icon == "calendar" && <AntDesign name={"calendar"} size={130} color={"#99f6e4"} style={{marginTop:-10}}/>}
                  {icon == "add" && <AntDesign name={"plus"} size={150} color={"#99f6e4"} style={{marginTop:-10}}/>}
                  {icon == "message1" && <AntDesign name={"message1"} size={100} color={"#99f6e4"} style={{marginTop:10,marginRight:10}}/>}
                  </View>
              </View>
        }>
        <View className='w-full h-full'>
        {children}
        </View>
      </ParallaxScrollView>
      );
}