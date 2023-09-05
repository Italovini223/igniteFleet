import { Container, Content } from './styles';

import { Header } from '../../componentes/Header';
import { LicensePlateInput } from '../../componentes/LicensePlateInput';
import { TextAreaInput } from '../../componentes/TextAreaInput';
import { Button } from '../../componentes/Button';

export function Departure() {
  return (
    <Container>
      <Header title='Saida'/>
      <Content>
        <LicensePlateInput 
          label='Placa do veículo'
          placeholder='BRA2E19'
        />

        <TextAreaInput 
          label='Finalidade'
          placeholder='Vou utilizar o carro para...'
        />

        <Button title='Registrar Saída'/>
      </Content>
    </Container>
  );
}