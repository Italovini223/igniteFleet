import { IconProps } from 'phosphor-react-native';
import { Container } from './styles';

import { TouchableOpacityProps } from 'react-native'
import theme from '../../theme';
import { useTheme } from 'styled-components/native';

export type IconBoxPros = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  icon: IconBoxPros
}

export function ButtonIcon({ icon: Icon, ...rest}: Props) {
  const { COLORS } = useTheme()

  return (
    <Container 
      activeOpacity={0.7}
      {...rest}
    
    >
        <Icon 
          size={24}
          color={COLORS.BRAND_MID}
        />
    </Container>
  );
}