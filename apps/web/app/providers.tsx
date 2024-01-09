'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { RelayEnvironmentProvider } from 'react-relay';
import { createEnvironment } from './relay/relayEnvironment';

export function Providers({ children }: { children: React.ReactNode }) {
  const environment = createEnvironment();

  return (
    <RelayEnvironmentProvider environment={environment}>
      <ChakraProvider theme={theme} resetCSS>
        {children}
      </ChakraProvider>
    </RelayEnvironmentProvider>
  );
}
