import { useRef, useState } from 'react';
import { TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useNavigation } from '@react-navigation/native';

import { useUser } from '@realm/react'

import { Container, Content } from './styles';

import { licensePlateValidate } from '../../utils/licensesPlateValidate';


import { Header } from '../../componentes/Header';
import { LicensePlateInput } from '../../componentes/LicensePlateInput';
import { TextAreaInput } from '../../componentes/TextAreaInput';
import { Button } from '../../componentes/Button';


export function Departure() {
  const [description, setDescription] = useState('')
  const [licensesPlate, setLicensesPlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const { goBack } = useNavigation()

  const realm = useRealm();
  const user = useUser();

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  function handleDepartureRegister(){
    try {
      if(!licensePlateValidate(licensesPlate)){
        licensePlateRef.current?.focus();
        return Alert.alert('Placa invalida', 
          'A placa e invalida. Por favor informe a placa correta do veículo'
        )
      }
  
      if(description.trim().length === 0){
        descriptionRef.current?.focus();
        return Alert.alert('Finalidade', 'Por favor informe a finalidade da utilização do veículo')
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          description,
          license_plate: licensesPlate.toUpperCase()
        }))
      })


      Alert.alert('Saida', 'Saida do veiculo registrada com sucesso')

      goBack()


    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Nao foi possível registrar a Saida do veículo')
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <Container>
      <Header title='Saida'/>

      <KeyboardAwareScrollView extraHeight={100}>
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

            <Button title='Registrar Saída' isLoading={isRegistering} onPress={handleDepartureRegister}/>
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}