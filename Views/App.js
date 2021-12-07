/* eslint-disable max-nested-callbacks */
import React, { useEffect, useState } from 'react';
import { checkInternetConnection } from 'react-native-offline';
import FlashMessage from 'react-native-flash-message';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import Navigation from '../Routes/Navigation';
import { AuthProvider } from '../Contexts/AuthContext';
import { LoadingProvider } from '../Contexts/LoadingContext';
import { showMessage } from 'react-native-flash-message';

const App = () => {
  const [isConnected, setConnection] = useState(true);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      checkInternetConnection()
        .then((isConnected) => setConnection(isConnected))
        .catch((e) => console.log(`error getting status : ${e}`));
    }, 1000);
    return () => clearInterval(syncInterval);
  });

  useEffect(() => {
    if (isConnected) {
      showMessage({
        message: 'Conexión estable',
        description:
          'El dispositivo se encuentra conectado, todos los datos se sincronizarán.',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Dispositivo sin conexión',
        description:
          'El dispositivo se encuentra sin conexión, todos los datos se almacenaran para sincronizar una vez se retome la conexión.',
        type: 'danger',
      });
    }
  }, [isConnected]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <AuthProvider>
        <LoadingProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Navigation />
          </ApplicationProvider>
        </LoadingProvider>
      </AuthProvider>
      <FlashMessage
        position="top"
        hideOnPress
        animationDuration={250}
        autoHide
        duration={8000}
      />
    </>
  );
};

export default App;
