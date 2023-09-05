import { TouchableOpacity } from 'react-native';

import { useUser, useApp } from '@realm/react'

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '../../theme';

import { 
  Container,
  Greeting,
  Message,
  Name,
  Picture
} from './styles';

import { Power } from 'phosphor-react-native'

export function HomeHeader() {
  const user = useUser()
  const app = useApp()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 32;

  function handleLogOut(){
    app.currentUser?.logOut()
  }

  return (
    <Container style={{ paddingTop }}>
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