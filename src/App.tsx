import React from 'react';

import {
  ChakraProvider,
  ComponentStyleConfig,
  extendTheme,
} from '@chakra-ui/react';
import AppRouter from './pages/Router';
import AuthProvider from './layers/AuthProvider';
import BrowserProvider from './layers/BrowserProvider';
import ContextProvider from 'layers/ContextProvider';
import ReduxProvider from './layers/ReduxProvider';
import SocketioProvider from './layers/SocketioProvider';
import StorageProvider from 'layers/StorageProvider';
import StoreProvider from './context/store';
import ThemeProvider from './layers/ThemeProvider';
import ThemeWrapper from './components/themeWrapper/ThemeWrapper';

const Input: ComponentStyleConfig = {
  defaultProps: {
    size: 'lg',
  },
};

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'base',
    _focus: { boxShadow: 'none' },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    _focus: { boxShadow: 'none' },
  },
};

const theme = extendTheme({
  components: {
    Button,
    Input,
    CheckBox: {
      defaultProps: {
        _focus: { boxShadow: 'none' },
      },
    },
  },
  colors: {
    primary: {
      200: '#EC407AB2',
      400: '#ec407a',
    },
  },
});

const App = () => (
  <ChakraProvider theme={theme}>
    <ThemeWrapper>
      <StoreProvider>
        <StorageProvider>
          <ContextProvider>
            <ReduxProvider>
              <ThemeProvider>
                <BrowserProvider>
                  <AuthProvider>
                    <SocketioProvider>
                      <AppRouter />
                    </SocketioProvider>
                  </AuthProvider>
                </BrowserProvider>
              </ThemeProvider>
            </ReduxProvider>
          </ContextProvider>
        </StorageProvider>
      </StoreProvider>
    </ThemeWrapper>
  </ChakraProvider>
);

export default App;
