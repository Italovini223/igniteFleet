import { useState } from 'react';
import { Container, Slogan, Title } from './styles';

import BackgroundImg from '../../assets/background.png'

import { Button } from '../../componentes/Button';

export function SingIn() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container
      source={BackgroundImg}
    >
      <Title>
        Ignite Fleet
      </Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        title='Entrar com Google' 
        isLoading={isLoading}
        />
    </Container>
  );
}