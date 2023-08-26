import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { SingIn } from './src/screens/SingIn';

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <SingIn />
    </View>
  );
}
