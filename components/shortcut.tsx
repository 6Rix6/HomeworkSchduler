import { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import SvgComponent from '@/assets/icons/right-arrow-component';
import { useColorScheme } from '@/hooks/useColorScheme';

type props = {
    title:string;
    buttonTitle:string;
    height?:number;
}

export default function Shortcut({title,buttonTitle,height=300}:props) {
  const colorScheme = useColorScheme();
  return (
    <View className="p-5 pt-0 w-screen">
      <View
        className={`rounded-lg border ${colorScheme === "dark"?`border-gray-300 bg-gray-800 text-white`:`border-gray-900 text-black`}`}
        style={{height:height}}
      >
        <View className={`h-10 border-b  ${colorScheme == "dark"?`border-gray-300`:`border-gray-900`} flex flex-row items-center`}>{/** ヘッダー */}
            <Text className={`font-bold text-2xl mt-auto mb-auto ml-5 ${colorScheme == "dark"?`text-white`:`text-black`}`}>{title}</Text>
            <View className='flex-1 w-full items-end'>
              <TouchableOpacity
                className='flex flex-row items-end'>
                  <Text className={`font-bold text-lg mt-auto mb-auto ${colorScheme == "dark"?`text-white`:`text-black`}`}>{buttonTitle}</Text>
                  <SvgComponent stroke={colorScheme == "dark"?"#fff":"#000"} fill={colorScheme == "dark"?"#fff":"#000"}/>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
}
