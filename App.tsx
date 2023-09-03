import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider, UserProvider } from '@realm/react'

import { RealmProvider } from './src/libs/realm';

import theme from './src/theme';

import { REALM_APP_ID } from '@env';

 import { Routes } from './src/routes';

import { SingIn } from './src/screens/SingIn';

import { Loading } from './src/componentes/Loading';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if(!fontsLoaded){
    return(
      <Loading />
    )
  }
  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent
          />
          <UserProvider fallback={SingIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
