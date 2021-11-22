
import React, { useEffect } from 'react';
import { showMessage } from 'react-native-flash-message'
import { SalesProvider } from '../Contexts/SalesContext';
import { checkInternetConnection } from 'react-native-offline'

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider
} from '@ui-kitten/components';

import Navigation from '../Routes/Navigation';
import { AuthProvider } from '../Contexts/AuthContext';
import { DataProvider } from '../Contexts/DataContext';

const App = () => {
  const [isConnected, setConnection] = React.useState(null)

  useEffect(() => {
    console.log(isConnected);
    const syncInterval = setInterval(() => {
      checkInternetConnection()
        .then((isConnected) => setConnection(isConnected))
        .catch((e) => console.log(`error getting status : ${e}`))
    }, 1000)
    return () => clearInterval(syncInterval)
  })

  useEffect(() => {
    if (!isConnected) {
      showMessage({
        description:
          'El dispositivo se encuentra sin conexión, todos los datos se almacenaran para sincronizar una vez se retome la conexión.',
        message: 'Dispositivo sin conexión.',
        type: 'info',
        icon: 'warning',
        duration: 2500,
        style: {
          paddingVertical: 15,
          backgroundColor: 'red',
        },
        titleStyle: {
          fontSize: 18,
        },
        textStyle: {
          fontSize: 14,
        },
      })
    }
  }, [isConnected]);

  return (
    <AuthProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <DataProvider>
          <SalesProvider>
            <Navigation />
          </SalesProvider>
        </DataProvider>
      </ApplicationProvider>
    </AuthProvider>
  );
};

export default App;
