import { Container, Content } from './styles';

import { useNavigation } from '@react-navigation/native';

import { HomeHeader } from '../../componentes/HomeHeader';
import { CarStatus } from '../../componentes/CarStatus';

export function Home() {
  const { navigate } = useNavigation()

  function handleRegisterMovement(){
   navigate('departure');
  }

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus onPress={handleRegisterMovement}/>
      </Content>
    </Container>
  );
}