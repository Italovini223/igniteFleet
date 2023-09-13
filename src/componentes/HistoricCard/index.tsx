import {  TouchableOpacityProps } from 'react-native'

import { Check, ClockClockwise } from 'phosphor-react-native'

import { Container, Info, LicensePlate, Departure } from './styles';
import { useTheme } from 'styled-components/native';


export type HistoryCardProps = {
  licensePlate: string;
  created: string;
  isSync: boolean;
}

type Porps = TouchableOpacityProps & {
  data: HistoryCardProps;
}

export function HistoricCard({data, ...rest}: Porps) {
  const { COLORS } = useTheme()
  return (
    <Container
      {...rest}
    >
      <Info>
        <LicensePlate>
          {data.licensePlate}
        </LicensePlate>

        <Departure>
          {data.created}
        </Departure>
      </Info>

      {
        data.isSync ?
        <Check  
          size={24}
          color={COLORS.BRAND_LIGHT}
        />
        :

        <ClockClockwise 
          size={24}
          color={COLORS.GRAY_400}
        />
      }
      
    </Container>
  );
}