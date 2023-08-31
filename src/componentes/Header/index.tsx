import { TouchableOpacity } from 'react-native';

import { useUser, useApp } from '@realm/react'

import theme from '../../theme';

import { 
  Container,
  Greeting,
  Message,
  Name,
  Picture
} from './styles';

import { Power } from 'phosphor-react-native'

export function Header() {
  const user = useUser()
  const app = useApp()

  function handleLogOut(){
    app.currentUser?.logOut()
  }

  return (
    <Container>
      <Picture 
        source={{ uri: user.profile.pictureUrl }}
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />
      <Greeting>
        <Message>
          Ola
        </Message>
        <Name>
          {user.profile.name}
        </Name>
      </Greeting>
      <TouchableOpacity activeOpacity={0.7} onPress={handleLogOut}>
        <Power size={32} color={theme.COLORS.GRAY_400}/>
      </TouchableOpacity>
    </Container>
  );
}