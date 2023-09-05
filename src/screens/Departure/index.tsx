import { useRef } from 'react';
import { TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { Container, Content } from './styles';

import { Header } from '../../componentes/Header';
import { LicensePlateInput } from '../../componentes/LicensePlateInput';
import { TextAreaInput } from '../../componentes/TextAreaInput';
import { Button } from '../../componentes/Button';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister(){
    console.log('nice');
  }

  return (
    <Container>
      <Header title='Saida'/>

      <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior}>
        <ScrollView style={{flex: 1}}>
          <Content>
            <LicensePlateInput 
              label='Placa do veículo'
              placeholder='BRA2E19'
              returnKeyType='next'
              onSubmitEditing={() => { descriptionRef.current?.focus()}}
            />

            <TextAreaInput 
              ref={descriptionRef}
              label='Finalidade'
              placeholder='Vou utilizar o carro para...'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
            />

            <Button title='Registrar Saída'/>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}