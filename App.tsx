import 'react-native-get-random-values'
import './src/libs/dayjs'

import Realm from "realm";
Realm.flags.THROW_ON_GLOBAL_REALM = true


import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider, UserProvider } from '@realm/react'
import { RealmProvider } from './src/libs/realm';

import { syncConfig } from './src/libs/realm';

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
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800}}>
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent
          />
          <UserProvider fallback={SingIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
