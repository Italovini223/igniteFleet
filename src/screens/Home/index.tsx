import { useState, useEffect } from 'react';

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

  function handleRegisterMovement(){
   navigate('departure');
  }

  function fetchVehicle(){
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
  
      setVehicleInUse(vehicle)

    } catch (error){
      Alert.alert('Veiculo em uso', 'Erro ao carregar o veiculo em uso.')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [])

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