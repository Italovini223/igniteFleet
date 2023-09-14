import { useState, useEffect } from 'react';

import { Alert, FlatList } from 'react-native';

import { useRealm } from '../../libs/realm';

import dayjs from 'dayjs';

import { Container, Content, Label, Title } from './styles';

import { useNavigation } from '@react-navigation/native';

import { useQuery } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { HomeHeader } from '../../componentes/HomeHeader';
import { CarStatus } from '../../componentes/CarStatus';
import { HistoricCard, HistoryCardProps } from '../../componentes/HistoricCard';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoryCardProps[]>([])

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
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)")
      const formattedHistoric = response.map((item) => {
        return ({
          id: item._id!.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format('[saída em] DD/MM/YYYY [as] HH:mm'),
        })
      })
  
      setVehicleHistoric(formattedHistoric)

    } catch (error){
      console.log(error)
      Alert.alert('Histórico', 'nao foi possível carregar o histórico')
    }
  }

  function handleHistoricDetails(id: string){
    navigate('arrival', { id })
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])  

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => {
      if(realm && !realm.isClosed){
        realm.removeListener('change', fetchVehicleInUse);
      }

    }
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

        <Title>
          Histórico
        </Title>

        <FlatList 
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard 
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>Nenhum veiculo utilizado</Label>
          )}
        />

      </Content>
    </Container>
  );
}