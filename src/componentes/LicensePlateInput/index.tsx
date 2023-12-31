import { forwardRef } from 'react'

import { TextInputProps, TextInput } from 'react-native'

import { useTheme } from 'styled-components/native';

import { Container, Input, Label } from './styles';

type Props = TextInputProps & {
  label: string;
}

const  LicensePlateInput = forwardRef<TextInput, Props> (({ label, ...rest }, ref) =>  {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input 
        maxLength={7}
        autoCapitalize='characters'
        placeholderTextColor={COLORS.GRAY_400}
        ref={ref}
        {...rest}
      />
    </Container>
  );
})

export { LicensePlateInput }