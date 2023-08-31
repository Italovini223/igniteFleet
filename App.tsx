import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { ThemeProvider } from 'styled-components/native';

import { AppProvider, UserProvider } from '@realm/react'

import theme from './src/theme';

import { REALM_APP_ID } from '@env';

import { SingIn } from './src/screens/SingIn';
import { Home } from './src/screens/Home';

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
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="transparent" 
          translucent
        />
        <UserProvider fallback={SingIn}>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
