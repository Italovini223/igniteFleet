import { useRef, useState } from 'react';
import { TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

import { Container, Content } from './styles';

import { licensePlateValidate } from '../../utils/licensesPlateValidate';

import { Header } from '../../componentes/Header';
import { LicensePlateInput } from '../../componentes/LicensePlateInput';
import { TextAreaInput } from '../../componentes/TextAreaInput';
import { Button } from '../../componentes/Button';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensesPlate, setLicensesPlate] = useState('')

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  function handleDepartureRegister(){
    if(!licensePlateValidate(licensesPlate)){
      licensePlateRef.current?.focus();
      return Alert.alert('Placa invalida', 
      'A placa e invalida. Por favor informe a placa correta do veículo'
    )
    }
  }

  return (
    <Container>
      <Header title='Saida'/>

      <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior}>
        <ScrollView style={{flex: 1}}>
          <Content>
            <LicensePlateInput 
             ref={licensePlateRef}
              label='Placa do veículo'
              placeholder='BRA2E19'
              returnKeyType='next'
              onSubmitEditing={() => { descriptionRef.current?.focus()}}
              onChangeText={setLicensesPlate}
            />

            <TextAreaInput 
              ref={descriptionRef}
              label='Finalidade'
              placeholder='Vou utilizar o carro para...'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button title='Registrar Saída'/>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}