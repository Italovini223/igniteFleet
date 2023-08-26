import { ThemeProvider } from 'styled-components/native';

import theme from './src/theme';
import { SingIn } from './src/screens/SingIn';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SingIn />
    </ThemeProvider>
  );
}
