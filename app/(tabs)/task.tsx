import { Text, View ,ScrollView, StyleSheet,Image } from 'react-native';
import CustomParallaxScrollView from '@/components/CustomeParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
  <CustomParallaxScrollView title='Task' icon="bars">
  </CustomParallaxScrollView>
  );
}