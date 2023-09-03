import { Container, Content } from './styles';

import { Header } from '../../componentes/Header';
import { CarStatus } from '../../componentes/CarStatus';

export function Home() {
  return (
    <Container>
      <Header />
      <Content>
        <CarStatus />
      </Content>
    </Container>
  );
}