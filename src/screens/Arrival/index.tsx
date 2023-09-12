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


  return (
    <Container>
      <Header title='Chegada'/>

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

        <Footer>
          <ButtonIcon 
            icon={X}
            onPress={handleRemoveVehicleUsage}
          />

          <Button 
            title='Registrar chegada'
          />
        </Footer>
      </Content>
    </Container>
  );
}