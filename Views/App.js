
import React, { useEffect } from 'react';
import { SalesProvider } from '../Contexts/SalesContext';
import { checkInternetConnection } from 'react-native-offline'

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider
} from '@ui-kitten/components';

import Navigation from '../Routes/Navigation';
import { AuthProvider } from '../Contexts/AuthContext';
import { DataProvider } from '../Contexts/DataContext';
import { LoadingProvider } from '../Contexts/LoadingContext';
import { Alert } from 'react-native';

const App = () => {
  const [isConnected, setConnection] = React.useState(true)

  useEffect(() => {
    const syncInterval = setInterval(() => {
      checkInternetConnection()
        .then((isConnected) => setConnection(isConnected))
        .catch((e) => console.log(`error getting status : ${e}`))
    }, 1000)
    return () => clearInterval(syncInterval)
  })

  useEffect(() => {
    if (!isConnected) {
      Alert.alert(
        'Dispositivo sin conexión.',
        'El dispositivo se encuentra sin conexión, todos los datos se almacenaran para sincronizar una vez se retome la conexión.'
      )
    }
  }, [isConnected]);
  return (
    <AuthProvider>
      <LoadingProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <DataProvider>
            <SalesProvider>
              <Navigation />
            </SalesProvider>
          </DataProvider>
        </ApplicationProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default App;
