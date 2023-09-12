import { useState, useEffect } from 'react';

import { useRealm } from '../../libs/realm';

import { Container, Content } from './styles';

import { useNavigation } from '@react-navigation/native';

import { useQuery } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { HomeHeader } from '../../componentes/HomeHeader';
import { CarStatus } from '../../componentes/CarStatus';
import { Alert } from 'react-native';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation()

  const historic = useQuery(Historic)
  const realm = useRealm()

  function handleRegisterMovement(){
    if(vehicleInUse?._id){
      return navigate('arrival', { id:  vehicleInUse._id.toString() })
    } else {
      navigate('departure');
    }
  }

  function fetchVehicleInUse(){
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
  
      setVehicleInUse(vehicle)

    } catch (error){
      Alert.alert('Veiculo em uso', 'Erro ao carregar o veiculo em uso.')
      console.log(error)
    }
  }

  function fetchHistoric(){
    const response = historic.filtered("status = 'arrival' SORT(created_at DESC)")
    console.log(response)
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])  

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => realm.removeListener('change', fetchVehicleInUse)
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus 
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />
      </Content>
    </Container>
  );
}