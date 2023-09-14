import{ Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';

import { X } from 'phosphor-react-native';




import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { BSON } from 'realm';

import { Container, Label, Content, LicensePlate, Description, Footer, } from './styles';

import { Header } from '../../componentes/Header';
import { Button } from '../../componentes/Button';
import { ButtonIcon } from '../../componentes/ButtonIcon';



 type RouteParamsPros = {
  id: string
 }

export function Arrival() {
  const route = useRoute()

  const { id } = route.params as RouteParamsPros
  const { goBack } = useNavigation()

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
  const realm = useRealm()

  const title = historic?.status === 'arrival' ? 'Chegada' : 'Detalhes'

  

  function handleRemoveVehicleUsage(){
    Alert.alert(
      "Cancelar",
      "Cancelar a utilização do veiculo?",
      [
        {
          text: "Não",
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => removeVehicleUsage()
        }
      ]
    )
  }

  function removeVehicleUsage(){
    realm.write(() => {
      realm.delete(historic)
    })

   goBack()
  }

  function handleArrivalRegister(){
    try {
      if(!historic){
        return Alert.alert("Erro", "Não foi possível obter os dados")
      }

      realm.write( () => {
          historic.status = 'arrival';
          historic.updated_at = new Date();
        }
      )

      Alert.alert("Chegada", "Chegada registrada com sucesso")

      goBack();

    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível registar a chegada do veiculo")
    } 
  }


  return (
    <Container>
      <Header title={title}/>

      <Content>
        <Label>
          Placa do veículo
        </Label>

        <LicensePlate>
          {historic?.license_plate}
        </LicensePlate>

        <Label>
          Finalidade
        </Label>

        <Description>
          {historic?.description}
        </Description>

        {
          historic?.status === 'departure' &&
          <Footer>
            <ButtonIcon 
              icon={X}
              onPress={handleRemoveVehicleUsage}
            />

            <Button 
              title='Registrar chegada'
              onPress={handleArrivalRegister}
            />
          </Footer>

        }
      </Content>
    </Container>
  );
}