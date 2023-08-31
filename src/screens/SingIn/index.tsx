import { useState, useEffect } from 'react';

import { Alert } from 'react-native';

import { Realm, useApp } from '@realm/react'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

import { Container, Slogan, Title } from './styles';

import BackgroundImg from '../../assets/background.png'

import { Button } from '../../componentes/Button';


WebBrowser.maybeCompleteAuthSession()

export function SingIn() {
  const [isLoading, setIsLoading] = useState(false);
  
  const app = useApp()

  const [_, response, googleSingIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  })

  function handleGoogleSingIn(){
    setIsLoading(true)

    googleSingIn().then((response) => {
      if(response.type != 'success'){
        setIsLoading(false)
      }

    })
  }

  useEffect(() => {
    if(response?.type === 'success'){
      if(response.authentication?.idToken){
        const credentials = Realm.Credentials.jwt(response.authentication.idToken)

        app.logIn(credentials).catch((error) => {
          console.log(error);
          
          Alert.alert('Entrar', 'Nao foi possível conectar-se a sua const Google')
          setIsLoading(false)
        })

        
      } else {
        Alert.alert('Entrar', 'Nao foi possível conectar-se a sua const Google')
        setIsLoading(false)
      }
    }
  }, [response])

  return (
    <Container
      source={BackgroundImg}
    >
      <Title>
        Ignite Fleet
      </Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        title='Entrar com Google' 
        isLoading={isLoading}
        onPress={handleGoogleSingIn}
        />
    </Container>
  );
}