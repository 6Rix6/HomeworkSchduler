import { Text, View ,ScrollView, StyleSheet,Image } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomeParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import Today from '@/components/Today';


export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
  <CustomParallaxScrollView title='Calendar' icon="calendar">
  </CustomParallaxScrollView>
  );
}