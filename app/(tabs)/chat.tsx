import { Text, View ,ScrollView, StyleSheet,Image, TouchableOpacity } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomeParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import OpenAI from 'openai';
import { useState } from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState<string | null>(null);


  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: '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',
    defaultHeaders: {
    },
  });

  const SendMessage = async () => {
    console.log('Sending message...');
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.5-pro-exp-03-25:free',
      messages: [
        {
          role: 'user',
          content: '人生の意味とは？',
        },
      ],
    });
    console.log(completion.choices[0].message.content);
    setMessages(completion.choices[0].message.content);
  };

  return (
  <CustomParallaxScrollView title='Chat' icon="message1">
    <View className='p-3 h-full w-full border-2 border-primary-500 rounded-lg'>
      <View className='flex flex-col justify-between h-full w-full border-2 border-primary-500 rounded-lg p-2'>
        <View className='flex flex-col justify-between border-2 border-primary-500 rounded-lg p-2'>
          <View className='overflow-y-auto'>
            <Text>{"trext"}</Text>
          </View>
        </View>
        <TouchableOpacity 
        onPress={SendMessage}
        className='bg-primary-500 rounded-lg p-2 mt-5'>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  </CustomParallaxScrollView>
  );
}