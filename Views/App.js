
import React from 'react';
import { FormDataProvider } from '../Contexts/FormContext';

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider
} from '@ui-kitten/components';

import Navigation from '../Routes/Navigation';
import { AuthProvider } from '../Contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <FormDataProvider>
          <Navigation />
        </FormDataProvider>
      </ApplicationProvider>
    </AuthProvider>
  );
};

export default App;
